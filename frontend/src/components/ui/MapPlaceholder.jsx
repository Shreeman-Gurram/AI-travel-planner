export const MapPlaceholder = ({ destination }) => (
  <div className="flex h-64 items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200 text-center text-slate-600 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 dark:text-slate-300">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">Map Preview</p>
      <h3 className="mt-2 text-xl font-semibold">{destination}</h3>
      <p className="mt-2 text-sm">Interactive preview will appear here.</p>
    </div>
  </div>
)
