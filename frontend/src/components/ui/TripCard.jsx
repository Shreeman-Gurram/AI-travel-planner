import { motion } from 'framer-motion'
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa'

export const TripCard = ({ trip, onFavorite, onView }) => (
  <motion.article
    whileHover={{ y: -6, scale: 1.01 }}
    className="overflow-hidden rounded-[28px] border border-white/60 bg-white/70 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70"
  >
    <div className="relative h-48">
      <img src={trip.image} alt={trip.title} className="h-full w-full object-cover" />
      <button
        onClick={() => onFavorite(trip.id)}
        className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-sm text-rose-500"
      >
        <FaHeart className={trip.favorite ? 'fill-rose-500' : ''} />
      </button>
      <div className="absolute bottom-4 left-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white">
        {trip.type}
      </div>
    </div>
    <div className="space-y-4 p-5">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <FaMapMarkerAlt />
        <span>{trip.destination}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{trip.title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{trip.summary}</p>
      </div>
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>${trip.budget}</span>
        <span>{trip.travelers} travelers</span>
      </div>
      <button onClick={() => onView(trip.id)} className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
        View Details
      </button>
    </div>
  </motion.article>
)
