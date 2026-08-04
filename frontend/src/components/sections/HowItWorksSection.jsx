const steps = [
  { title: 'Tell us your vibe', desc: 'Share your destination, dates, budget, and interests.' },
  { title: 'AI designs your plan', desc: 'Receive a balanced itinerary with hotels, dining, and transport.' },
  { title: 'Refine and save', desc: 'Adjust anything you want and keep your favorite trips handy.' }
]

export const HowItWorksSection = () => (
  <section className="rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
    <div className="mb-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">How it works</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">From idea to itinerary in three simple steps.</h2>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((step, index) => (
        <div key={index} className="rounded-[24px] bg-white/80 p-6 shadow-sm dark:bg-slate-900/70">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-semibold text-orange-600">0{index + 1}</div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
)
