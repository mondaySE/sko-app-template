import { Rocket } from 'lucide-react'
import { MondayLogo } from '@/components/MondayLogo'

export function HomePage() {
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
