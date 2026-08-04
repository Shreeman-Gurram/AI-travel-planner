import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaCompass, FaMoneyBillWave, FaSearch, FaMagic } from 'react-icons/fa'
import { useTrip } from '../context/TripContext'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { DestinationCard } from '../components/ui/DestinationCard'
import { WeatherCard } from '../components/ui/WeatherCard'
import { destinations, recentSearches, stats, travelTips, weatherSnapshots } from '../data/mockData'
import { TripCard } from '../components/ui/TripCard'

const DashboardPage = () => {
  const { trips, savedTrips, toggleFavorite, setActiveTrip } = useTrip()
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Welcome back</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">{user?.name || 'Traveler'}, your next escape is ready.</h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Review upcoming plans, monitor your budget, and build new adventures in one calm, intelligent workspace.</p>
          </div>
          <Link to="/planner"><Button>Quick Generate Trip</Button></Link>
        </div>
      </motion.section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-3 text-blue-600"><FaCalendarAlt /> <span className="font-semibold">Upcoming Trips</span></div>
            <div className="mt-5 space-y-3">
              {trips.slice(0, 2).map((trip) => (
                <div key={trip.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">{trip.title}</h3>
                    <span className="text-sm text-slate-500">{trip.startDate}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{trip.destination}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200/70 bg-gradient-to-br from-orange-500 to-amber-400 p-6 text-white shadow-lg">
            <div className="flex items-center gap-3"><FaMoneyBillWave /> <span className="font-semibold">Budget Summary</span></div>
            <div className="mt-6 text-4xl font-semibold">$3,200</div>
            <p className="mt-2 text-orange-50">Healthy spend alignment for the season.</p>
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Weather</h2>
            <FaCompass className="text-blue-600" />
          </div>
          <div className="mt-4 space-y-4">
            {weatherSnapshots.slice(0, 2).map((item) => <WeatherCard key={item.city} weather={item} />)}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Recent Trips</h2>
            <Link to="/saved" className="text-sm font-semibold text-blue-600">View All</Link>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {savedTrips.map((trip) => <TripCard key={trip.id} trip={trip} onFavorite={toggleFavorite} onView={() => setActiveTrip(trip)} />)}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-3 text-orange-500"><FaMagic /> <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">AI Suggestions</h2></div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {['Sunset cruise', 'Private tasting tour', 'Spa morning'].map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">{item}</li>)}
            </ul>
          </div>
          <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-3 text-blue-600"><FaSearch /> <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Recent Searches</h2></div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {recentSearches.map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Recommended Destinations</h2>
          <Link to="/about" className="text-sm font-semibold text-blue-600">See why</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {destinations.map((destination) => <DestinationCard key={destination.id} destination={destination} />)}
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Travel Tips</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {travelTips.map((tip) => <div key={tip} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">{tip}</div>)}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => <div key={stat.label} className="rounded-[24px] border border-slate-200/70 bg-white/80 p-6 text-center shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70"><p className="text-sm text-slate-500">{stat.label}</p><p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">{stat.value}</p></div>)}
      </section>
    </div>
  )
}

export default DashboardPage
