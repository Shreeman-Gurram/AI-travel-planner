import { FaGlobeAmericas, FaShieldAlt, FaSyncAlt } from 'react-icons/fa'

const features = [
  { icon: <FaGlobeAmericas />, title: 'Global Inspiration', desc: 'Browse premium destinations and local favorites curated for modern travelers.' },
  { icon: <FaSyncAlt />, title: 'Adaptive Planning', desc: 'Switch moods, budgets, and travel styles without restarting your itinerary.' },
  { icon: <FaShieldAlt />, title: 'Reliable Experience', desc: 'Enjoy polished flows, clear budgets, and helpful travel tips from start to finish.' }
]

export const FeatureSection = () => (
  <section className="py-16">
    <div className="mb-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Features</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">Everything you need for elevated travel planning.</h2>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((feature, index) => (
        <div key={index} className="rounded-[28px] border border-slate-200/80 bg-white/70 p-8 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mb-5 inline-flex rounded-2xl bg-blue-50 p-4 text-xl text-blue-600 dark:bg-blue-950/40">{feature.icon}</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{feature.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
)
