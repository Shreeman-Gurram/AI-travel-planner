import { Toaster } from 'react-hot-toast'
import { AppRouter } from './routes/AppRouter'
import { AuthProvider } from './context/AuthContext'
import { TripProvider } from './context/TripContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TripProvider>
          <AppRouter />
          <Toaster position="top-right" toastOptions={{ duration: 3200 }} />
        </TripProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
