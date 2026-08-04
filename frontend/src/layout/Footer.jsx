import { Link } from 'react-router-dom'

export const Footer = () => (
  <footer className="border-t border-slate-200/70 bg-white/70 py-10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">TripPilot AI</h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">A premium travel experience crafted for modern wanderers who want intelligent planning without the friction.</p>
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-slate-50">Explore</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/planner">Planner</Link></li>
          <li><Link to="/saved">Saved Trips</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-slate-50">Contact</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>hello@trippilot.ai</li>
          <li>+1 (800) 555-0148</li>
          <li>Available worldwide</li>
        </ul>
      </div>
    </div>
  </footer>
)
