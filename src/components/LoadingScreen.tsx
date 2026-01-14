import { Loader2 } from 'lucide-react'

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Loader2 className="h-12 w-12 animate-spin text-[#00CA72]" />
      <p className="text-lg text-slate-300">{message}</p>
    </div>
  )
}
