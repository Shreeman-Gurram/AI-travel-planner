import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useTrip } from '../context/TripContext'

const steps = ['Planning your itinerary...', 'Personalizing activities...', 'Preparing your budget...', 'Creating travel tips...', 'Finalizing your trip...']

const LoadingPage = () => {
  const navigate = useNavigate()
  const { pendingTripData, generateTrip } = useTrip()
  const started = useRef(false)

  useEffect(() => {
    if (!pendingTripData) { navigate('/planner', { replace: true }); return undefined }
    if (started.current) return undefined
    started.current = true
    let active = true
    generateTrip(pendingTripData).then((trip) => { if (active) navigate(`/trip/${trip.id}`, { replace: true }) }).catch((error) => { if (active) { toast.error(error.message || 'Unable to generate trip'); navigate('/planner', { replace: true }) } })
    return () => { active = false }
  }, [generateTrip, navigate, pendingTripData])

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl rounded-[32px] border border-slate-200/70 bg-white/80 p-10 text-center shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-4xl text-white">✈️</div>
        <h1 className="mt-8 text-3xl font-semibold text-slate-900 dark:text-slate-50">Crafting your perfect getaway</h1>
        <div className="mt-8 space-y-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
              <span>{step}</span>
              <span className="text-blue-500">{index < 3 ? '●' : '○'}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingPage
