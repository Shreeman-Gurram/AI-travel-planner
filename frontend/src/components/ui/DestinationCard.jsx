import { motion } from 'framer-motion'

export const DestinationCard = ({ destination }) => (
  <motion.article whileHover={{ y: -5, scale: 1.01 }} className="overflow-hidden rounded-[24px] border border-white/60 bg-white/80 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
    <img src={destination.image} alt={destination.name} className="h-44 w-full object-cover" />
    <div className="space-y-2 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{destination.name}</h3>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">★ {destination.rating}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{destination.blurb}</p>
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>{destination.country}</span>
        <span>{destination.price}</span>
      </div>
    </div>
  </motion.article>
)
