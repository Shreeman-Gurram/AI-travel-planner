import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { getApiFieldErrors, validateSignupForm } from '../utils/formValidation'

const SignupPage = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateSignupForm(form)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    try {
      await signup(form)
      navigate('/dashboard')
    } catch (error) {
      setErrors(getApiFieldErrors(error))
      setFormError(error.message || 'Unable to create account')
      toast.error(error.message || 'Unable to create account')
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-2 py-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/80 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-orange-500 to-amber-400 p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-100">Create account</p>
            <h1 className="mt-4 text-3xl font-semibold">Start planning smarter trips today.</h1>
            <p className="mt-4 text-orange-50">Build your travel identity, save favorites, and unlock a beautiful planning experience.</p>
          </div>
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {formError && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{formError}</p>}
              <Input label="Full Name" placeholder="Jordan Lee" value={form.name} error={errors.name} onChange={(e) => updateField('name', e.target.value)} />
              <Input label="Email" type="email" placeholder="you@example.com" value={form.email} error={errors.email} onChange={(e) => updateField('email', e.target.value)} />
              <Input label="Password" type="password" placeholder="Password" value={form.password} error={errors.password} onChange={(e) => updateField('password', e.target.value)} />
              <Input label="Confirm Password" type="password" placeholder="Confirm password" value={form.confirmPassword} error={errors.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} />
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <Link to="/login" className="font-semibold text-blue-600">Log in</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignupPage
