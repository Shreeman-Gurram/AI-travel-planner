/**
 * Weather Service
 * Handles geocoding and weather forecast using Open-Meteo API
 * No API key required for free tier
 */

const https = require('https');
const { getWeatherInfo } = require('../utils/weatherCodeMap');

const GEOCODING_API = 'geocoding-api.open-meteo.com';
const FORECAST_API = 'api.open-meteo.com';

const createError = (message, statusCode) => Object.assign(new Error(message), { statusCode });

/**
 * Utility function to make HTTPS requests
 */
const httpsGet = (hostname, path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path,
      method: 'GET',
      timeout: 10000,
    };

    const request = https.request(options, (response) => {
      let data = '';
      
      if (response.statusCode !== 200) {
        reject(createError(`API returned status ${response.statusCode}`, response.statusCode));
        return;
      }

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(createError('Invalid JSON response', 502));
        }
      });
    });

    request.on('error', (error) => {
      reject(createError(error.message, 503));
    });

    request.on('timeout', () => {
      request.destroy();
      reject(createError('Request timed out', 504));
    });

    request.end();
  });
};

/**
 * Geocode destination to latitude, longitude, and timezone
 * @param {string} destination - City name or location
 * @returns {Promise} - { name, latitude, longitude, timezone, country }
 */
const geocodeDestination = async (destination) => {
  if (!destination || typeof destination !== 'string') {
    throw createError('Invalid destination provided', 400);
  }

  console.log('[GEOCODING] Geocoding destination:', destination);

  try {
    const encodedDestination = encodeURIComponent(destination);
    const path = `/v1/search?name=${encodedDestination}&count=1&language=en&format=json`;
    
    const data = await httpsGet(GEOCODING_API, path);

    if (!data.results || data.results.length === 0) {
      console.warn('[GEOCODING] No results for:', destination);
      throw createError(`Destination "${destination}" not found. Please check the spelling and try again.`, 404);
    }

    const result = data.results[0];
    
    console.log('[GEOCODING] Success! Found:', result.name, 'at', result.latitude, result.longitude);

    return {
      name: result.name,
      country: result.country || '',
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone || 'UTC',
      admin1: result.admin1 || '',
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error('[GEOCODING] Error:', error.message);
    throw createError('Unable to find destination. Please try again.', 503);
  }
};

/**
 * Get weather forecast for given coordinates and date range
 * @param {number} latitude
 * @param {number} longitude
 * @param {Date|string} startDate
 * @param {Date|string} endDate
 * @param {string} timezone
 * @returns {Promise} - Forecast array
 */
const getWeatherForecast = async (latitude, longitude, startDate, endDate, timezone) => {
  // Ensure dates are Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  console.log('[FORECAST] Fetching forecast for coords:', latitude, longitude);
  console.log('[FORECAST] Date range:', start.toISOString(), 'to', end.toISOString());

  // Open-Meteo free tier supports up to 16 days of forecast
  const maxDays = 16;
  const daysDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (daysDifference > maxDays) {
    throw createError(
      'Weather forecast is not available for dates this far in advance. Open-Meteo supports up to 16 days of forecasts.',
      400
    );
  }

  const startDateStr = start.toISOString().split('T')[0];
  const endDateStr = end.toISOString().split('T')[0];

  console.log('[FORECAST] API call with dates:', startDateStr, 'to', endDateStr);

  try {
    const encodedTimezone = encodeURIComponent(timezone);
    const path = `/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDateStr}&end_date=${endDateStr}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max&temperature_unit=celsius&wind_speed_unit=kmh&timezone=${encodedTimezone}`;
    
    const data = await httpsGet(FORECAST_API, path);

    if (!data.daily || !data.daily.time) {
      console.error('[FORECAST] Invalid data:', data);
      throw createError('Invalid forecast data received', 502);
    }

    // Process daily forecast
    const forecast = data.daily.time.map((date, index) => {
      const weatherCode = data.daily.weather_code[index];
      const weatherInfo = getWeatherInfo(weatherCode);

      return {
        date,
        minTemperature: Math.round(data.daily.temperature_2m_min[index] || 0),
        maxTemperature: Math.round(data.daily.temperature_2m_max[index] || 0),
        precipitationProbability: data.daily.precipitation_probability_max[index] || 0,
        condition: weatherInfo.description,
        weatherCode,
        windSpeed: Math.round(data.daily.wind_speed_10m_max[index] || 0),
        icon: weatherInfo.icon,
      };
    });

    console.log('[FORECAST] Got', forecast.length, 'days of forecast');
    return forecast;
  } catch (error) {
    if (error.statusCode) throw error;
    console.error('[FORECAST] Error:', error.message);
    throw createError('Unable to fetch weather forecast. Please try again later.', 503);
  }
};

/**
 * Get complete weather data for a trip
 * Combines geocoding and forecast
 * @param {string} destination
 * @param {Date|string} startDate
 * @param {Date|string} endDate
 * @returns {Promise} - Complete weather object with location and forecast
 */
const getWeatherForTrip = async (destination, startDate, endDate) => {
  console.log('[WEATHER_SERVICE] Starting weather fetch for:', destination);
  
  try {
    // Step 1: Geocode destination
    const locationData = await geocodeDestination(destination);

    // Step 2: Get weather forecast
    const forecast = await getWeatherForecast(
      locationData.latitude,
      locationData.longitude,
      startDate,
      endDate,
      locationData.timezone
    );

    // Step 3: Return combined weather data
    const weatherData = {
      location: locationData.name,
      country: locationData.country,
      admin1: locationData.admin1,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      timezone: locationData.timezone,
      forecast,
    };
    
    console.log('[WEATHER_SERVICE] Weather fetch complete!');
    return weatherData;
  } catch (error) {
    console.error('[WEATHER_SERVICE] Weather fetch failed:', error.message);
    // Re-throw with status code
    throw error;
  }
};

module.exports = {
  geocodeDestination,
  getWeatherForecast,
  getWeatherForTrip,
};
