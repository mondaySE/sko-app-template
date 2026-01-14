import { useState } from 'react'
import { Toaster } from 'sonner'
import { Loader2, AlertCircle } from 'lucide-react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FloatingSettingsButton } from './components/FloatingSettingsButton'
import { useBoardsLoader } from './hooks/useBoardsLoader'
import { useBoardsStore } from './stores/boards-store'

function App() {
  const [count, setCount] = useState(0)
  const { loading, error } = useBoardsStore()
  
  // Load boards on app start
  useBoardsLoader()

  if (loading) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="text-lg text-gray-600">Loading boards...</p>
        </div>
        <FloatingSettingsButton />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-lg text-red-600 font-medium">{error}</p>
          <p className="text-sm text-gray-500">Please check your settings and try again.</p>
        </div>
        <FloatingSettingsButton />
      </>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <FloatingSettingsButton />
    </>
  )
}

export default App
