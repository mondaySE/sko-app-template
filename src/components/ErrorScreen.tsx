import { AlertCircle } from 'lucide-react'

interface ErrorScreenProps {
  message: string
  hint?: string
}

export function ErrorScreen({ message, hint = 'Please check your settings and try again.' }: ErrorScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AlertCircle className="h-12 w-12 text-[#FF3D57]" />
      <p className="text-lg text-[#FF3D57] font-medium">{message}</p>
      <p className="text-sm text-slate-400">{hint}</p>
    </div>
  )
}
