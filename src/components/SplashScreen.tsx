import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import teddyLottie from '../assets/teddybear.lottie'

interface Props {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: Props) {
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(onComplete, 800) // Match fade out duration
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1a0f0f 50%, #0d0d0d 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Ambient particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-rose-300/10"
              style={{
                left: `${ Math.random() * 100}%`,
                top: `${ Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Lottie Animation Container */}
          <motion.div 
            className="w-64 h-64 md:w-80 md:h-80 relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <DotLottieReact
              src={teddyLottie}
              loop
              autoplay
            />
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            className="text-center mt-8 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="font-handwriting text-3xl md:text-4xl mb-2" style={{ color: '#f9ece8' }}>
              Para meu amor 🧸
            </h2>
            <p className="font-sans text-xs tracking-[0.2em] uppercase opacity-50" style={{ color: '#f9ece8' }}>
              Um mês de uma eternidade que virá
            </p>
          </motion.div>

          {/* Styled Entry Button */}
          <motion.button
            onClick={handleStart}
            className="mt-12 px-10 py-4 rounded-full relative group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Background with animated gradient */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#e8747c] to-[#f06292] opacity-90 transition-opacity group-hover:opacity-100"
            />
            
            {/* Inner text */}
            <span className="relative z-10 font-sans text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
              Abrir Nosso Álbum
              <span className="text-lg">📸</span>
            </span>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-[150%]"
              animate={{ translateX: '250%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
            />
          </motion.button>

          {/* Footer hint */}
          <div className="absolute bottom-32 flex flex-col items-center gap-2 pointer-events-none">
            <motion.p
              className="font-sans text-[11px] tracking-widest uppercase opacity-60 flex items-center gap-2"
              style={{ color: '#fff' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2.2 }}
            >
              <span>Aumente o áudio para uma melhor experiência</span>
              <span className="text-sm">🔊</span>
            </motion.p>
          </div>

          <motion.p
            className="absolute bottom-8 font-sans text-[10px] tracking-widest uppercase opacity-30"
            style={{ color: '#fff' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2 }}
          >
            feito com todo carinho do mundo
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
