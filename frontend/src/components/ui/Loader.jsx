export const Loader = () => (
  <div className="flex items-center justify-center py-10">
    <div className="flex gap-2">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
          style={{ animationDelay: `${dot * 120}ms` }}
        />
      ))}
    </div>
  </div>
)
