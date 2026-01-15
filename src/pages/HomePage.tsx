import { RocketLaunch } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { MondayLogo } from '@/components/MondayLogo'

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MondayLogo className="w-32 h-32 drop-shadow-2xl" />
        </motion.div>
        
        <motion.div 
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FF3D57] via-[#FFCB00] to-[#00CA72] bg-clip-text text-transparent">
            Ready to Level Up?
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            You're about to build something amazing. This workshop will take your monday.com app skills to the next level.
          </p>
        </motion.div>

        <motion.div 
          className="flex items-center gap-3 mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF3D57]/20 via-[#FFCB00]/20 to-[#00CA72]/20 border-2 border-[#FFCB00]/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            boxShadow: [
              '0 0 20px rgba(255, 203, 0, 0.3)',
              '0 0 40px rgba(255, 203, 0, 0.5)',
              '0 0 20px rgba(255, 203, 0, 0.3)'
            ]
          }}
          transition={{ 
            y: { duration: 0.5, delay: 0.4 },
            opacity: { duration: 0.5, delay: 0.4 },
            boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <RocketLaunch sx={{ width: 24, height: 24, color: '#FFCB00' }} />
          </motion.div>
          <span className="text-lg font-semibold text-white">You are now ready to start vibe coding</span>
        </motion.div>
      </div>
    </div>
  )
}
