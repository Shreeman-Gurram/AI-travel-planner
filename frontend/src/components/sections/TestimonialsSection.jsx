const testimonials = [
  { name: 'Ava', role: 'Weekend explorer', quote: 'The experience feels effortless and luxurious. I planned a full weekend in under ten minutes.' },
  { name: 'Noah', role: 'Digital nomad', quote: 'I loved the budget summaries and instant local suggestions. It feels like a travel concierge.' },
  { name: 'Mina', role: 'Family traveler', quote: 'The layout is elegant and the recommendations are genuinely useful. My family loved it.' }
]

export const TestimonialsSection = () => (
  <section className="py-16">
    <div className="mb-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Testimonials</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">Trusted by travelers who love beautiful planning.</h2>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((item, index) => (
        <div key={index} className="rounded-[24px] border border-slate-200/80 bg-white/70 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm leading-8 text-slate-600 dark:text-slate-300">“{item.quote}”</p>
          <div className="mt-6">
            <p className="font-semibold text-slate-900 dark:text-slate-50">{item.name}</p>
            <p className="text-sm text-slate-500">{item.role}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
)
