export const Textarea = ({ label, className = '', ...props }) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
    {label && <span>{label}</span>}
    <textarea
      className={`min-h-[110px] rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900/70 ${className}`}
      {...props}
    />
  </label>
)
