export const WeatherCard = ({ weather }) => {
  if (!weather || !weather.location) {
    return (
      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-sky-500/20 to-blue-600/10 p-5 shadow-lg backdrop-blur-xl">
        <p className="text-sm text-slate-500">Weather information unavailable</p>
      </div>
    );
  }

  const { location, country, forecast } = weather;
  const firstDay = forecast && forecast.length > 0 ? forecast[0] : null;

  return (
    <div className="space-y-4">
      {/* Current location info */}
      <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-sky-500/20 to-blue-600/10 p-5 shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Forecast Location</p>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              {location}
              {country && `, ${country}`}
            </h3>
          </div>
          <div className="text-4xl">📍</div>
        </div>
      </div>

      {/* First day forecast */}
      {firstDay && (
        <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-sky-500/20 to-blue-600/10 p-5 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{firstDay.date}</p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{firstDay.condition}</h3>
            </div>
            <div className="text-4xl">{firstDay.icon}</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-slate-500">Temperature</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {firstDay.minTemperature}°C - {firstDay.maxTemperature}°C
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Wind Speed</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{firstDay.windSpeed} km/h</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Precipitation</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{firstDay.precipitationProbability}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Daily forecast */}
      {forecast && forecast.length > 1 && (
        <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-sky-500/20 to-blue-600/10 p-5 shadow-lg backdrop-blur-xl">
          <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-50">7-Day Forecast</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-7">
            {forecast.slice(0, 7).map((day) => (
              <div key={day.date} className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-800/70">
                <p className="text-xs text-slate-500">{day.date.split('-').slice(1).join('/')}</p>
                <p className="text-2xl">{day.icon}</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                  {day.minTemperature}°-{day.maxTemperature}°
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
