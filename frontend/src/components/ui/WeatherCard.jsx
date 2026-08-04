export const WeatherCard = ({ weather }) => (
  <div className="rounded-[24px] border border-white/60 bg-gradient-to-br from-sky-500/20 to-blue-600/10 p-5 shadow-lg backdrop-blur-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">Forecast</p>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{weather.city}</h3>
      </div>
      <div className="text-4xl">{weather.icon}</div>
    </div>
    <div className="mt-4 flex items-end gap-2">
      <span className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{weather.temp}°</span>
      <span className="text-sm text-slate-600 dark:text-slate-300">{weather.condition}</span>
    </div>
  </div>
)
