import { motion } from 'framer-motion'
import { FaCompass, FaMagic, FaRoute } from 'react-icons/fa'
import { Button } from '../ui/Button'

export const HeroSection = () => (
  <section className="relative overflow-hidden rounded-[36px] border border-white/60 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-8 text-white shadow-[0_30px_80px_-20px_rgba(37,99,235,0.45)] sm:p-12 lg:p-16">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_40%)]" />
    <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="mb-4 inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur">AI-powered itinerary designer</p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Plan dream trips in minutes with intelligent guidance.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-blue-50">
          Discover polished routes, hotel picks, weather, and budgets crafted for the way you travel.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="secondary" className="bg-white text-blue-600">Start Planning</Button>
          <Button variant="accent" className="bg-orange-500">Explore Trips</Button>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-[32px] border border-white/30 bg-white/15 p-6 backdrop-blur-xl">
        <div className="grid gap-4">
          {[
            { icon: <FaMagic />, title: 'Instant AI Suggestions', desc: 'Tailored experiences based on your interests.' },
            { icon: <FaRoute />, title: 'Budget-aware Planning', desc: 'Keep every day aligned with your spending target.' },
            { icon: <FaCompass />, title: 'Smart Discoveries', desc: 'Hotels, food, and attractions in one flow.' }
          ].map((item, index) => (
            <div key={index} className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/20 p-3 text-xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-blue-50">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)
