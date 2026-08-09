export const Dropdown = ({ label, options = [], error, className = '', ...props }) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
    {label && <span>{label}</span>}
    <select
      aria-invalid={Boolean(error)}
      className={`rounded-2xl border bg-white/80 px-4 py-3 outline-none transition focus:ring-2 dark:bg-slate-900/70 ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-100 dark:border-rose-500' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 dark:border-slate-700'} ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className="text-sm font-normal text-rose-600 dark:text-rose-400">{error}</span>}
  </label>
)
