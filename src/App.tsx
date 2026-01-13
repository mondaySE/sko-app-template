import { useState } from 'react'
import { Toaster } from 'sonner'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FloatingSettingsButton } from './components/FloatingSettingsButton'
import { useBoardsLoader } from './hooks/useBoardsLoader'

function App() {
  const [count, setCount] = useState(0)
  
  // Load boards on app start
  useBoardsLoader()

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
