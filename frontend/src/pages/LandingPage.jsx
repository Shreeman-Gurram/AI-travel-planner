import { motion } from 'framer-motion'
import { HeroSection } from '../components/sections/HeroSection'
import { FeatureSection } from '../components/sections/FeatureSection'
import { HowItWorksSection } from '../components/sections/HowItWorksSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { FaqSection } from '../components/sections/FaqSection'
import { destinations } from '../data/mockData'
import { DestinationCard } from '../components/ui/DestinationCard'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

const LandingPage = () => (
  <div className="space-y-10">
    <HeroSection />
    <FeatureSection />
    <HowItWorksSection />
    <section className="py-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">Popular Destinations</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">Trending spots to inspire your next escape.</h2>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
    <TestimonialsSection />
    <FaqSection />
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-slate-200/80 bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-center text-white shadow-xl">
      <h2 className="text-3xl font-semibold">Ready to design your next adventure?</h2>
      <p className="mx-auto mt-3 max-w-2xl text-blue-50">Create tailored itineraries, compare stays, and keep every detail beautifully organized.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/planner"><Button variant="secondary" className="bg-white text-blue-600">Create Trip</Button></Link>
        <Link to="/signup"><Button variant="accent" className="bg-orange-500">Join Now</Button></Link>
      </div>
    </motion.section>
  </div>
)

export default LandingPage
