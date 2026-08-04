import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'

const ContactPage = () => (
  <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Contact</p>
    <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">We would love to hear from you.</h1>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Input label="Name" placeholder="Your name" />
        <Input label="Email" type="email" placeholder="you@example.com" />
      </div>
      <Textarea label="Message" placeholder="Share your ideas, feedback, or travel questions." />
    </div>
    <div className="mt-6"><Button>Send Message</Button></div>
  </div>
)

export default ContactPage
