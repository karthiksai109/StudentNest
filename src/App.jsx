import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Housing from './pages/Housing'
import Food from './pages/Food'
import Community from './pages/Community'
import Sports from './pages/Sports'
import VideoFeed from './pages/VideoFeed'
import SettlementGuide from './pages/SettlementGuide'
import StudentDiscounts from './pages/StudentDiscounts'

function ProtectedRoute({ children }) {
  const { student, isAuthReady } = useApp()
  if (!isAuthReady) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#0f766e', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /></div>
  if (!student) return <Navigate to="/login" replace />
  return children
}

function PublicRoute({ children }) {
  const { student, isAuthReady } = useApp()
  if (!isAuthReady) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#0f766e', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /></div>
  if (student) return <Navigate to="/dashboard" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={
        <PublicRoute><Register /></PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute><Login /></PublicRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/housing" element={
        <ProtectedRoute><Housing /></ProtectedRoute>
      } />
      <Route path="/food" element={
        <ProtectedRoute><Food /></ProtectedRoute>
      } />
      <Route path="/community" element={
        <ProtectedRoute><Community /></ProtectedRoute>
      } />
      <Route path="/sports" element={
        <ProtectedRoute><Sports /></ProtectedRoute>
      } />
      <Route path="/reviews" element={
        <ProtectedRoute><VideoFeed /></ProtectedRoute>
      } />
      <Route path="/settle" element={
        <ProtectedRoute><SettlementGuide /></ProtectedRoute>
      } />
      <Route path="/discounts" element={
        <ProtectedRoute><StudentDiscounts /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}
