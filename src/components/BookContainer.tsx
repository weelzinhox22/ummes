import { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Pagination, A11y } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import type { Swiper as SwiperType } from 'swiper'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'
import { pages } from '../data/pages'

// Preload critical assets hook/component
const AssetPreloader = () => {
  useEffect(() => {
    // Collect specific large image assets
    const images = [
      '/src/assets/pg1vagabundotbmama.webp',
      '/src/assets/todoamordomundo.webp',
      '/src/assets/tevivo.webp',
      '/src/assets/amorsemmedida.webp',
      '/src/assets/psiloveyou.webp',
      '/src/assets/YebbasHeartbreak.png'
    ]
    const audios = [
      '/src/assets/vagabundotbmama.mp3',
      '/src/assets/todoamordomundo.mp3',
      '/src/assets/tevivo.mp3',
      '/src/assets/amorsemmedida.mp3',
      '/src/assets/psiloveyou.mp3',
      '/src/assets/YebbasHeartbreak.mp3'
    ]

    images.forEach(src => {
      const img = new Image()
      img.src = src
    })

    audios.forEach(src => {
      const audio = new Audio()
      audio.src = src
      audio.preload = 'auto'
    })
  }, [])

  return null
}

// Swiper CSS
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/pagination'

// Falling petals
const petals = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  emoji: ['🌸', '🌺', '✿', '❀', '🌷'][i % 5],
  left: `${5 + (i * 7) % 90}%`,
  delay: i * 0.6,
  duration: 6 + (i % 4) * 1.5,
  size: 12 + (i % 3) * 4,
}))

export default function BookContainer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const swiperRef = useRef<SwiperType | null>(null)

  const total = pages.length

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
    setShowHint(false)
  }

  return (
    <div className="w-full h-full relative font-sans text-white overflow-hidden select-none bg-[#0d100d]">
      <AssetPreloader />
      {/* Background decoration */}

      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,116,124,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Falling petals */}
      {petals.map(p => (
        <span
          key={p.id}
          className="absolute petal select-none pointer-events-none"
          style={{
            left: p.left,
            top: '-20px',
            fontSize: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Header bar */}
      <motion.div
        className="absolute top-0 inset-x-0 z-40 flex items-center justify-center px-6"
        style={{
          paddingTop: 'max(env(safe-area-inset-top), 24px)',
          paddingBottom: 20,
          background: 'linear-gradient(180deg, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.4) 60%, transparent 100%)',
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 
          className="font-handwriting text-2xl md:text-3xl text-center select-none"
          style={{ 
            color: '#f9ece8',
            textShadow: '0 0 15px rgba(232,116,124,0.5), 0 0 2px rgba(232,116,124,0.8)',
            letterSpacing: '0.02em'
          }}
        >
          Sempre foi você, princesa linda 💕
        </h1>
        {/* Page counter removed */}
      </motion.div>

      {/* ── SWIPER ── */}
      <Swiper
        modules={[EffectCreative, Pagination, A11y]}
        effect="creative"
        className="w-full h-full"
        speed={520}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-105%', 0, -100],
            rotate: [0, 0, -5],
          },
          next: {
            shadow: true,
            translate: ['105%', 0, 0],
            rotate: [0, 0, 5],
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        grabCursor={true}
        a11y={{ prevSlideMessage: 'Slide anterior', nextSlideMessage: 'Próximo slide' }}
        onSwiper={swiper => { swiperRef.current = swiper }}
        onSlideChange={handleSlideChange}
        style={{ width: '100%', height: '100%' }}
      >
        {pages.map((page, i) => (
          <SwiperSlide key={page.id}>
            <div
              className="w-full h-full relative"
              style={{
                paddingTop: 'max(env(safe-area-inset-top), 60px)',
                paddingBottom: 'max(env(safe-area-inset-bottom), 70px)',
              }}
            >
              {/* Book frame */}
              <div
                className="absolute page-shadow rounded-2xl overflow-hidden"
                style={{
                  inset: 'max(env(safe-area-inset-top), 40px) 12px max(env(safe-area-inset-bottom), 50px) 12px',
                }}
              >
                {i === 0 && <Page1 isActive={activeIndex === 0} />}
                {i === 1 && <Page2 isActive={activeIndex === 1} />}
                {i === 2 && <Page3 isActive={activeIndex === 2} />}
                {i === 3 && <Page4 isActive={activeIndex === 3} />}
                {i === 4 && <Page5 isActive={activeIndex === 4} />}
                {i === 5 && <Page6 isActive={activeIndex === 5} />}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dots */}
      <div
        className="custom-pagination absolute bottom-0 inset-x-0 z-40 flex items-center justify-center gap-1"
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom), 18px)',
          paddingTop: 8,
          background: 'linear-gradient(0deg, rgba(13,11,9,0.7) 0%, transparent 100%)',
        }}
      />

      {/* Swipe hint overlay */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute inset-x-0 z-30 flex flex-col items-center gap-1 pointer-events-none"
            style={{ bottom: 'max(env(safe-area-inset-bottom), 22px)', paddingBottom: 36 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.div
              animate={{ x: [0, 18, 0] }}
              transition={{ duration: 1.4, repeat: 3, ease: 'easeInOut' }}
            >
              <span style={{ fontSize: 22 }}>👆</span>
            </motion.div>
            <p className="font-sans text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
              deslize para folhear
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final page — hearts rain on last slide */}
      <AnimatePresence>
        {activeIndex === total - 1 && (
          <>
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute pointer-events-none text-2xl"
                style={{ left: `${5 + Math.random() * 90}%`, top: '-5%' }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: Math.random() * 60 - 30 }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {['❤️', '🧡', '💛', '💚', '💙', '💜', '🩷'][i % 7]}
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
