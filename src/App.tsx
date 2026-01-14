import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Loader2, AlertCircle, Rocket } from 'lucide-react'
import './App.css'
import { FloatingSettingsButton } from './components/FloatingSettingsButton'
import { useBoardsLoader } from './hooks/useBoardsLoader'
import { useBoardsStore } from './stores/boards-store'

function MondayLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="140" r="24" fill="#FF3D57"/>
      <circle cx="100" cy="140" r="24" fill="#FFCB00"/>
      <circle cx="160" cy="140" r="24" fill="#00CA72"/>
      <rect x="28" y="60" width="24" height="80" rx="12" fill="#FF3D57"/>
      <rect x="88" y="80" width="24" height="60" rx="12" fill="#FFCB00"/>
      <rect x="148" y="40" width="24" height="100" rx="12" fill="#00CA72"/>
    </svg>
  )
}

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <MondayLogo className="w-32 h-32 drop-shadow-2xl" />
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FF3D57] via-[#FFCB00] to-[#00CA72] bg-clip-text text-transparent">
            Ready to Level Up?
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            You're about to build something amazing. This workshop will take your monday.com app skills to the next level.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700">
          <Rocket className="w-5 h-5 text-[#FFCB00]" />
          <span className="text-slate-300 font-medium">Let's step up your game</span>
        </div>
      </div>
    </div>
  )
}

function App() {
  const { loading, error } = useBoardsStore()
  
  // Load boards on app start
  useBoardsLoader()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Toaster position="top-right" />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#00CA72]" />
          <p className="text-lg text-slate-300">Loading boards...</p>
        </div>
        <FloatingSettingsButton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Toaster position="top-right" />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <AlertCircle className="h-12 w-12 text-[#FF3D57]" />
          <p className="text-lg text-[#FF3D57] font-medium">{error}</p>
          <p className="text-sm text-slate-400">Please check your settings and try again.</p>
        </div>
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
