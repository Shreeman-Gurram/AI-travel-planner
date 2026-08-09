import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { getApiFieldErrors, validateLoginForm } from '../utils/formValidation'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, continueAsGuest } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateLoginForm(form)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    try {
      await login(form)
      navigate('/dashboard')
    } catch (error) {
      setErrors(getApiFieldErrors(error))
      setFormError(error.message || 'Unable to log in')
      toast.error(error.message || 'Unable to log in')
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-2 py-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/80 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Welcome back</p>
            <h1 className="mt-4 text-3xl font-semibold">Sign in to your travel command center.</h1>
            <p className="mt-4 text-blue-50">Search destinations, manage saved itineraries, and keep every plan beautifully organized.</p>
          </div>
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {formError && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{formError}</p>}
              <Input label="Email" type="email" placeholder="you@example.com" value={form.email} error={errors.email} onChange={(e) => updateField('email', e.target.value)} />
              <Input label="Password" type="password" placeholder="Password" value={form.password} error={errors.password} onChange={(e) => updateField('password', e.target.value)} />
              <div className="flex items-center justify-between text-sm text-slate-500">
                <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
                <a href="#" className="text-blue-600">Forgot password?</a>
              </div>
              <Button type="submit" className="w-full">Continue</Button>
            </form>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"><FaGoogle /> Google</button>
              <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"><FaFacebook /> Facebook</button>
              <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"><FaGithub /> GitHub</button>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">New here?</p>
              <Link to="/signup" className="text-sm font-semibold text-blue-600">Create account</Link>
            </div>
            <button onClick={() => { continueAsGuest(); navigate('/dashboard') }} className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Continue as Guest</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
