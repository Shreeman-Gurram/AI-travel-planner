/**
 * Weather Service
 * Handles geocoding and weather forecast using Open-Meteo API
 * No API key required for free tier
 */

const { getWeatherInfo } = require('../utils/weatherCodeMap');

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API = 'https://api.open-meteo.com/v1/forecast';

const createError = (message, statusCode) => Object.assign(new Error(message), { statusCode });

/**
 * Geocode destination to latitude, longitude, and timezone
 * @param {string} destination - City name or location
 * @returns {Promise} - { name, latitude, longitude, timezone, country }
 */
const geocodeDestination = async (destination) => {
  if (!destination || typeof destination !== 'string') {
    throw createError('Invalid destination provided', 400);
  }

  try {
    const response = await Promise.race([
      fetch(
        `${GEOCODING_API}?name=${encodeURIComponent(destination)}&count=1&language=en&format=json`
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(createError('Geocoding request timed out', 504)), 10000)
      ),
    ]);

    if (!response.ok) {
      throw createError('Geocoding service unavailable', 503);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw createError(`Destination "${destination}" not found. Please check the spelling and try again.`, 404);
    }

    const result = data.results[0];

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
    throw createError('Unable to find destination. Please try again.', 503);
  }
};

/**
 * Get weather forecast for given coordinates and date range
 * @param {number} latitude
 * @param {number} longitude
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {string} timezone
 * @returns {Promise} - Forecast array
 */
const getWeatherForecast = async (latitude, longitude, startDate, endDate, timezone) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

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

  try {
    const response = await Promise.race([
      fetch(
        `${FORECAST_API}?latitude=${latitude}&longitude=${longitude}&start_date=${startDateStr}&end_date=${endDateStr}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max&temperature_unit=celsius&wind_speed_unit=kmh&timezone=${encodeURIComponent(timezone)}`
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(createError('Forecast request timed out', 504)), 10000)
      ),
    ]);

    if (!response.ok) {
      throw createError('Weather forecast service unavailable', 503);
    }

    const data = await response.json();

    if (!data.daily || !data.daily.time) {
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

    return forecast;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError('Unable to fetch weather forecast. Please try again later.', 503);
  }
};

/**
 * Get complete weather data for a trip
 * Combines geocoding and forecast
 * @param {string} destination
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Promise} - Complete weather object with location and forecast
 */
const getWeatherForTrip = async (destination, startDate, endDate) => {
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
    return {
      location: locationData.name,
      country: locationData.country,
      admin1: locationData.admin1,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      timezone: locationData.timezone,
      forecast,
    };
  } catch (error) {
    // Re-throw with status code
    throw error;
  }
};

module.exports = {
  geocodeDestination,
  getWeatherForecast,
  getWeatherForTrip,
};
