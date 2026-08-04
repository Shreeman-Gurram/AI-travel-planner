import { useState } from 'react'
import { faqItems } from '../../data/mockData'

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-16">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">Questions travelers ask before booking their next escape.</h2>
      </div>
      <div className="mx-auto max-w-3xl space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="rounded-[24px] border border-slate-200/80 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <button onClick={() => setOpenIndex(index === openIndex ? -1 : index)} className="flex w-full items-center justify-between text-left">
              <span className="font-semibold text-slate-900 dark:text-slate-50">{item.question}</span>
              <span className="text-xl text-blue-500">{index === openIndex ? '−' : '+'}</span>
            </button>
            {index === openIndex && <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
