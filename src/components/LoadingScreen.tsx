import { CircularProgress } from '@mui/material'

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <CircularProgress sx={{ color: '#00CA72', width: 48, height: 48 }} />
      <p className="text-lg text-slate-300">{message}</p>
    </div>
  )
}
