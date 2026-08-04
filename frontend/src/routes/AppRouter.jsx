import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import DashboardPage from '../pages/DashboardPage'
import PlannerPage from '../pages/PlannerPage'
import LoadingPage from '../pages/LoadingPage'
import TripDetailPage from '../pages/TripDetailPage'
import SavedTripsPage from '../pages/SavedTripsPage'
import ProfilePage from '../pages/ProfilePage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import NotFoundPage from '../pages/NotFoundPage'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/trip/:id" element={<TripDetailPage />} />
        <Route path="/saved" element={<SavedTripsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
