import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTrip } from '../context/TripContext'
import { Input } from '../components/ui/Input'
import { TripCard } from '../components/ui/TripCard'

const SavedTripsPage = () => {
  const { savedTrips, deleteTrip, toggleFavorite } = useTrip()
  const [query, setQuery] = useState('')

  const filteredTrips = useMemo(() =>
    savedTrips.filter((trip) => trip.title.toLowerCase().includes(query.toLowerCase()) || trip.destination.toLowerCase().includes(query.toLowerCase())),
  [query, savedTrips])

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Saved Trips</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">Your curated collection.</h1>
          </div>
          <div className="w-full max-w-md">
            <Input placeholder="Search saved trips" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="space-y-3">
            <TripCard trip={trip} onFavorite={toggleFavorite} onView={() => {}} />
            <div className="flex gap-3">
              <Link to={`/trip/${trip.id}`} className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white">View</Link>
              <button onClick={() => deleteTrip(trip.id).catch((error) => toast.error(error.message || 'Unable to delete trip'))} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedTripsPage
