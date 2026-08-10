/**
 * WMO Weather interpretation codes
 * Reference: https://www.open-meteo.com/en/docs
 *
 * Maps WMO codes to readable weather descriptions and icons
 */

const weatherCodeMap = {
  0: { description: 'Clear sky', icon: '☀️', category: 'clear' },
  1: { description: 'Mainly clear', icon: '🌤️', category: 'clear' },
  2: { description: 'Partly cloudy', icon: '⛅', category: 'cloudy' },
  3: { description: 'Overcast', icon: '☁️', category: 'cloudy' },
  45: { description: 'Foggy', icon: '🌫️', category: 'fog' },
  48: { description: 'Depositing rime fog', icon: '🌫️', category: 'fog' },
  51: { description: 'Light drizzle', icon: '🌦️', category: 'drizzle' },
  53: { description: 'Moderate drizzle', icon: '🌧️', category: 'drizzle' },
  55: { description: 'Dense drizzle', icon: '🌧️', category: 'drizzle' },
  61: { description: 'Slight rain', icon: '🌧️', category: 'rain' },
  63: { description: 'Moderate rain', icon: '🌧️', category: 'rain' },
  65: { description: 'Heavy rain', icon: '⛈️', category: 'rain' },
  71: { description: 'Slight snow', icon: '❄️', category: 'snow' },
  73: { description: 'Moderate snow', icon: '❄️', category: 'snow' },
  75: { description: 'Heavy snow', icon: '❄️', category: 'snow' },
  77: { description: 'Snow grains', icon: '❄️', category: 'snow' },
  80: { description: 'Slight rain showers', icon: '🌧️', category: 'rain' },
  81: { description: 'Moderate rain showers', icon: '🌧️', category: 'rain' },
  82: { description: 'Violent rain showers', icon: '⛈️', category: 'rain' },
  85: { description: 'Slight snow showers', icon: '❄️', category: 'snow' },
  86: { description: 'Heavy snow showers', icon: '❄️', category: 'snow' },
  95: { description: 'Thunderstorm', icon: '⛈️', category: 'thunderstorm' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️', category: 'thunderstorm' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️', category: 'thunderstorm' },
};

/**
 * Get weather description and icon from WMO code
 * @param {number} code - WMO weather code
 * @returns {object} - { description, icon, category }
 */
const getWeatherInfo = (code) => {
  return weatherCodeMap[code] || { description: 'Unknown', icon: '❓', category: 'unknown' };
};

module.exports = { weatherCodeMap, getWeatherInfo };
