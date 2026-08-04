import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaDownload, FaShareAlt, FaHeart, FaHotel, FaUtensils, FaPlane, FaExclamationTriangle } from 'react-icons/fa'
import { useTrip } from '../context/TripContext'
import { Button } from '../components/ui/Button'
import { MapPlaceholder } from '../components/ui/MapPlaceholder'
import { WeatherCard } from '../components/ui/WeatherCard'
import { hotels, restaurants, itineraryTemplates, emergencyContacts, packingSuggestions, travelTips, weatherSnapshots } from '../data/mockData'

const TripDetailPage = () => {
  const { id } = useParams()
  const { trips, saveTrip, savedTrips } = useTrip()
  const trip = useMemo(() => trips.find((item) => item.id === id) || trips[0], [id, trips])

  return (
    <div className="space-y-8">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/80 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <img src={trip.image} alt={trip.title} className="h-72 w-full object-cover" />
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Trip Overview</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">{trip.title}</h1>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{trip.summary}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => saveTrip(trip)}>Save Trip</Button>
              <Button variant="accent"><FaShareAlt className="mr-2 inline" />Share</Button>
              <Button variant="secondary"><FaDownload className="mr-2 inline" />Export PDF</Button>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm text-slate-500">Budget</p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">${trip.budget}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm text-slate-500">Travelers</p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">{trip.travelers}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm text-slate-500">Dates</p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">{trip.startDate} → {trip.endDate}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm text-slate-500">Type</p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">{trip.type}</p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Weather</h2>
            <div className="mt-4"><WeatherCard weather={weatherSnapshots[0]} /></div>
          </section>
          <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Hotels</h2>
            <div className="mt-4 space-y-4">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="flex gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <img src={hotel.image} alt={hotel.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">{hotel.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{hotel.location}</p>
                    <p className="mt-2 text-sm font-semibold text-blue-600">{hotel.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Restaurants</h2>
            <div className="mt-4 space-y-4">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <img src={restaurant.image} alt={restaurant.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">{restaurant.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{restaurant.cuisine}</p>
                    <p className="mt-2 text-sm font-semibold text-orange-500">{restaurant.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Map Preview</h2>
            <div className="mt-4"><MapPlaceholder destination={trip.destination} /></div>
          </section>
          <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Day-wise Itinerary</h2>
            <div className="mt-4 space-y-4">
              {itineraryTemplates.map((item) => (
                <div key={item.day} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <p className="text-sm font-semibold text-blue-600">Day {item.day}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.title}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Packing Suggestions</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {packingSuggestions.map((item) => <span key={item} className="rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-950/40">{item}</span>)}
            </div>
          </section>
          <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Emergency Contacts</h2>
            <div className="mt-4 space-y-3">
              {emergencyContacts.map((contact) => <div key={contact.number} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70"><p className="font-semibold text-slate-900 dark:text-slate-50">{contact.name}</p><p className="text-sm text-slate-600 dark:text-slate-300">{contact.number}</p></div>)}
            </div>
          </section>
          <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Travel Tips</h2>
            <div className="mt-4 space-y-3">
              {travelTips.map((tip) => <div key={tip} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">{tip}</div>)}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TripDetailPage
