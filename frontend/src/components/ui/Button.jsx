import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-white',
  accent: 'bg-orange-500 text-white hover:bg-orange-600',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100'
}

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`rounded-full px-5 py-3 font-semibold shadow-sm transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
