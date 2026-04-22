import { motion } from 'framer-motion'
import type { ScrapPage } from '../data/pages'

const themeStyles: Record<string, { bg: string; text: string; subtext: string; border: string }> = {
  light: {
    bg: 'linear-gradient(160deg, #f9f5ef 0%, #f0e8d8 100%)',
    text: '#3d2b1f',
    subtext: '#6b4c3b',
    border: 'rgba(139,80,60,0.15)',
  },
  dark: {
    bg: 'linear-gradient(160deg, #1a1410 0%, #0d0d0d 100%)',
    text: '#f5e6d8',
    subtext: 'rgba(245,230,216,0.6)',
    border: 'rgba(232,116,124,0.2)',
  },
  blush: {
    bg: 'linear-gradient(160deg, #fce8e8 0%, #f8d0d0 100%)',
    text: '#5c2929',
    subtext: '#8b4a4a',
    border: 'rgba(194,112,110,0.2)',
  },
  forest: {
    bg: 'linear-gradient(160deg, #1a2416 0%, #142010 100%)',
    text: '#d4f0c8',
    subtext: 'rgba(212,240,200,0.6)',
    border: 'rgba(102,187,106,0.2)',
  },
}

const tapeColors: Record<string, string> = {
  yellow: 'rgba(255,220,120,0.7)',
  pink: 'rgba(255,160,180,0.7)',
  blue: 'rgba(140,190,255,0.7)',
  mint: 'rgba(140,230,200,0.7)',
}

const textureOverlays: Record<string, string> = {
  light: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.4 0 0 0 0 0.3 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
  dark: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 0.9 0 0 0 0 0.8 0 0 0 0.025 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
  blush: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.7 0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
  forest: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.3 0 0 0 0 0.6 0 0 0 0 0.3 0 0 0 0.025 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
}

interface Props {
  page: ScrapPage
  isActive: boolean
}

export default function ScrapbookPage({ page, isActive }: Props) {
  const theme = themeStyles[page.theme]

  return (
    <div
      className="w-full h-full relative select-none"
      style={{
        background: theme.bg,
        overflow: 'hidden',
      }}
    >
      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: textureOverlays[page.theme],
          mixBlendMode: 'multiply',
          opacity: 0.6,
        }}
      />

      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(225deg, ${page.accentColor}22 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, ${page.accentColor}15 0%, transparent 60%)`,
        }}
      />

      {/* Tape strips */}
      {page.tapes.map((tape, i) => (
        <div
          key={i}
          className="absolute z-20 pointer-events-none"
          style={{
            top: tape.top,
            bottom: tape.bottom,
            left: tape.left,
            right: tape.right,
            width: 60,
            height: 18,
            background: tapeColors[tape.color],
            borderLeft: '1px dashed rgba(0,0,0,0.08)',
            borderRight: '1px dashed rgba(0,0,0,0.08)',
            borderRadius: 2,
            transform: `rotate(${tape.rotate}deg)`,
            boxShadow: '1px 1px 3px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(1px)',
          }}
        />
      ))}

      {/* Photo polaroids */}
      {page.photos.map((photo, i) => (
        <motion.div
          key={i}
          className="absolute polaroid"
          style={{
            top: photo.top,
            bottom: !photo.top ? (photo as any).bottom : undefined,
            left: photo.left,
            right: photo.right,
            transform: `rotate(${photo.rotate}deg)`,
            zIndex: photo.zIndex,
            maxWidth: '42vw',
            boxShadow: '2px 4px 16px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2)',
          }}
          initial={isActive ? { opacity: 0, scale: 0.85, y: 15 } : false}
          animate={isActive ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="block w-full object-cover"
            style={{
              aspectRatio: '4/5',
              minHeight: 90,
              filter: 'sepia(8%) contrast(1.05)',
            }}
            loading="lazy"
          />
          <p
            className="font-handwriting text-center mt-1 text-gray-500 text-xs leading-tight"
            style={{ paddingBottom: 2 }}
          >
            {photo.alt}
          </p>
        </motion.div>
      ))}

      {/* Main content — offset to lower third when photos exist */}
      <div
        className="absolute inset-x-0 flex flex-col"
        style={{
          bottom: page.photos.length > 0 ? '14%' : '20%',
          padding: '0 20px',
          zIndex: 15,
        }}
      >
        {page.date && (
          <motion.p
            className="font-sans text-xs tracking-widest uppercase mb-1"
            style={{ color: page.accentColor, opacity: 0.85 }}
            initial={isActive ? { opacity: 0, x: -12 } : false}
            animate={isActive ? { opacity: 0.85, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            {page.date}
          </motion.p>
        )}
        {page.title && (
          <motion.h2
            className="font-display font-semibold leading-tight mb-2"
            style={{ color: theme.text, fontSize: 'clamp(1.15rem, 5vw, 1.5rem)' }}
            initial={isActive ? { opacity: 0, y: 10 } : false}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {page.title}
          </motion.h2>
        )}
        <motion.p
          className="font-handwriting leading-snug"
          style={{
            color: theme.subtext,
            fontSize: 'clamp(0.95rem, 4.5vw, 1.25rem)',
            maxWidth: page.photos.length > 0 ? '55%' : '90%',
          }}
          initial={isActive ? { opacity: 0, y: 8 } : false}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {page.body}
        </motion.p>
      </div>

      {/* Stickers */}
      {page.stickers.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            fontSize: s.size,
            transform: `rotate(${s.rotate}deg)`,
            zIndex: 25,
            lineHeight: 1,
            filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.25))',
          }}
          initial={isActive ? { opacity: 0, scale: 0 } : false}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 300, damping: 18 }}
        >
          <span className="sticker">{s.emoji}</span>
        </motion.div>
      ))}

      {/* Page accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${page.accentColor}44, transparent)` }}
      />
    </div>
  )
}
