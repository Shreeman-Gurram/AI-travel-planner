import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

const ProfilePage = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center gap-5">
          <img src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'} alt={user?.name} className="h-20 w-20 rounded-full object-cover" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{user?.name || 'Traveler'}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">{user?.email || 'traveler@tripilot.ai'}</p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <p className="text-sm text-slate-500">Saved Trips</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">12</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <p className="text-sm text-slate-500">Countries Visited</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">19</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <p className="text-sm text-slate-500">Preferences</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Beach escapes, boutique stays, flexible dining.</p>
          </div>
        </div>
      </div>
      <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Edit Profile</h2>
        <div className="mt-6 space-y-4">
          <Input label="Name" value={user?.name || ''} />
          <Input label="Email" value={user?.email || ''} />
          <Button variant="secondary">Save Changes</Button>
        </div>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">Theme</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Switch between light and dark aesthetics.</p>
            </div>
            <Button onClick={toggleTheme}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
