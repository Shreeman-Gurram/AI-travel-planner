import { Link, NavLink } from 'react-router-dom'
import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { navItems } from '../constants'

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-slate-50">
          <span className="rounded-2xl bg-blue-600 p-3 text-white">✈️</span>
          TripPilot AI
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={({ isActive }) => (isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600 dark:text-slate-300')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="rounded-full border border-slate-200 p-3 text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70">
              <FaUserCircle className="text-xl text-blue-600" />
              <div className="hidden text-sm sm:block">
                <p className="font-semibold text-slate-900 dark:text-slate-50">{user?.name}</p>
                <p className="text-slate-500">{user?.email}</p>
              </div>
              <button onClick={logout} className="text-sm font-semibold text-slate-600 dark:text-slate-300">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
