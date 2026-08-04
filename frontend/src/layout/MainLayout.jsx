import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const MainLayout = () => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <Navbar />
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <Footer />
  </div>
)
