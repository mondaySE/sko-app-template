import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'
import { FloatingSettingsButton } from './components/FloatingSettingsButton'
import { LoadingScreen } from './components/LoadingScreen'
import { ErrorScreen } from './components/ErrorScreen'
import { HomePage } from './pages/HomePage'
import { useBoardsLoader } from './hooks/useBoardsLoader'
import { useBoardsStore } from './stores/boards-store'

function App() {
  const { loading, error } = useBoardsStore()
  
  // Load boards on app start
  useBoardsLoader()

  if (loading) {
    return (
      <div className="min-h-screen">
        <Toaster position="top-right" />
        <LoadingScreen message="Loading boards..." />
        <FloatingSettingsButton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Toaster position="top-right" />
        <ErrorScreen message={error} />
        <FloatingSettingsButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <FloatingSettingsButton />
    </div>
  )
}

export default App
