import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useTrip } from '../context/TripContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Dropdown } from '../components/ui/Dropdown'
import { Textarea } from '../components/ui/Textarea'
import { currencies, transportationOptions, accommodationOptions, foodPreferences, travelTypes } from '../constants'
import { validatePlannerForm } from '../utils/formValidation'

const PlannerPage = () => {
  const navigate = useNavigate()
  const { generateTrip } = useTrip()
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    destination: 'Santorini',
    startDate: '2026-08-18',
    endDate: '2026-08-24',
    budget: '3200',
    currency: 'USD',
    travelers: '2',
    travelType: 'Romantic',
    interests: 'Beach, Dining',
    transportation: 'Flight',
    accommodation: 'Hotel',
    foodPreference: 'Local Cuisine',
    notes: 'Prefer scenic views and relaxed pacing.'
  })

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleNext = () => {
    const validationErrors = validatePlannerForm(form)
    const fields = step === 1 ? ['destination', 'startDate', 'endDate', 'budget'] : ['travelers', 'interests']
    const stepErrors = Object.fromEntries(Object.entries(validationErrors).filter(([field]) => fields.includes(field)))
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors)
      return
    }
    setStep((current) => Math.min(3, current + 1))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validatePlannerForm(form)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      setStep(['destination', 'startDate', 'endDate', 'budget'].some((field) => validationErrors[field]) ? 1 : 2)
      return
    }
    try {
      const trip = await generateTrip(form)
      toast.success('Trip created successfully')
      navigate(`/trip/${trip.id}`)
    } catch (error) {
      toast.error(error.message || 'Unable to create trip')
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Trip Planner</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">Craft your next itinerary.</h1>
          </div>
          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-950/40">Step {step} / 3</div>
        </div>
        <div className="mb-8 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${step * 33.3}%` }} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              <Input label="Destination" value={form.destination} error={errors.destination} onChange={(e) => updateField('destination', e.target.value)} />
              <Input label="Start Date" type="date" value={form.startDate} error={errors.startDate} onChange={(e) => updateField('startDate', e.target.value)} />
              <Input label="End Date" type="date" value={form.endDate} error={errors.endDate} onChange={(e) => updateField('endDate', e.target.value)} />
              <Input label="Budget" type="number" min="0" value={form.budget} error={errors.budget} onChange={(e) => updateField('budget', e.target.value)} />
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-6 md:grid-cols-2">
              <Dropdown label="Currency" options={currencies} value={form.currency} onChange={(e) => updateField('currency', e.target.value)} />
              <Input label="Number of Travelers" type="number" min="1" value={form.travelers} error={errors.travelers} onChange={(e) => updateField('travelers', e.target.value)} />
              <Dropdown label="Travel Type" options={travelTypes} value={form.travelType} onChange={(e) => updateField('travelType', e.target.value)} />
              <Input label="Interests" value={form.interests} error={errors.interests} onChange={(e) => updateField('interests', e.target.value)} />
            </div>
          )}
          {step === 3 && (
            <div className="grid gap-6 md:grid-cols-2">
              <Dropdown label="Transportation Preference" options={transportationOptions} value={form.transportation} onChange={(e) => updateField('transportation', e.target.value)} />
              <Dropdown label="Accommodation Preference" options={accommodationOptions} value={form.accommodation} onChange={(e) => updateField('accommodation', e.target.value)} />
              <Dropdown label="Food Preference" options={foodPreferences} value={form.foodPreference} onChange={(e) => updateField('foodPreference', e.target.value)} />
              <Textarea label="Special Notes" value={form.notes} onChange={(e) => updateField('notes', e.target.value)} />
            </div>
          )}
          <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
            <Button type="button" variant="secondary" onClick={() => setStep((current) => Math.max(1, current - 1))}>Back</Button>
            {step < 3 ? (
              <Button type="button" onClick={handleNext}>Next</Button>
            ) : (
              <Button type="submit">Generate Trip</Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default PlannerPage
