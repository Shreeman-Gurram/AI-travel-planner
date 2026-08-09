const emailPattern = /^\S+@\S+\.\S+$/

export const getApiFieldErrors = (error) => Object.fromEntries(
  (error.errors || []).filter((item) => item.field).map((item) => [item.field, item.message])
)

export const validateLoginForm = ({ email, password }) => {
  const errors = {}
  if (!email.trim()) errors.email = 'Email is required'
  else if (!emailPattern.test(email.trim())) errors.email = 'Please enter a valid email'
  if (!password) errors.password = 'Password is required'
  return errors
}

export const validateSignupForm = ({ name, email, password, confirmPassword }) => {
  const errors = validateLoginForm({ email, password })
  if (!name.trim()) errors.name = 'Name is required'
  else if (name.trim().length < 2 || name.trim().length > 100) errors.name = 'Name must be between 2 and 100 characters'
  if (password && (password.length < 6 || password.length > 72)) errors.password = 'Password must be between 6 and 72 characters'
  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password'
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match'
  return errors
}

export const validatePlannerForm = ({ destination, startDate, endDate, budget, travelers, interests }) => {
  const errors = {}
  if (!destination.trim()) errors.destination = 'Destination is required'
  else if (destination.trim().length < 2) errors.destination = 'Destination must be at least 2 characters'
  if (!startDate) errors.startDate = 'Start date is required'
  if (!endDate) errors.endDate = 'End date is required'
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) errors.endDate = 'End date must be on or after start date'
  if (budget === '' || Number.isNaN(Number(budget)) || Number(budget) < 0) errors.budget = 'Budget cannot be negative'
  if (travelers === '' || !Number.isInteger(Number(travelers)) || Number(travelers) < 1) errors.travelers = 'Travelers must be at least 1'
  if (interests && interests.length > 500) errors.interests = 'Interests cannot exceed 500 characters'
  return errors
}
