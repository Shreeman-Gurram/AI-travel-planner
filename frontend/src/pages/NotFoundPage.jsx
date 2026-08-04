import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

const NotFoundPage = () => (
  <div className="flex min-h-[70vh] items-center justify-center px-4">
    <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-10 text-center shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-50">This page slipped away.</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">The route you requested could not be found, but your next journey is still waiting.</p>
      <div className="mt-8 flex justify-center"><Link to="/"><Button>Go Home</Button></Link></div>
    </div>
  </div>
)

export default NotFoundPage
