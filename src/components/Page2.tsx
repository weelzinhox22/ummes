import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import coverImage from '../assets/todoamordomundo.webp'
import songAudio from '../assets/todoamordomundo.mp3'

interface Props {
  isActive: boolean
}

function srtTimeToSeconds(t: string): number {
  const clean = t.replace(',', '.')
  const [hms, ms = '0'] = clean.split('.')
  const parts = hms.split(':').map(Number)
  const [h = 0, m = 0, s = 0] = parts
  return h * 3600 + m * 60 + s + Number(ms) / 1000
}

const RAW_SRT = `1
00:00:01.599 --> 00:00:02.779
Nunca.

2
00:00:03.259 --> 00:00:06.039
Depois que eu te amei, te juro, nunca.

3
00:00:06.659 --> 00:00:09.679
Pensei em outro alguém, pois sei que nunca.

4
00:00:10.239 --> 00:00:13.340
Existirá melhor que o amor da gente.

5
00:00:14.460 --> 00:00:17.600
Um milhão de vezes sou capaz de te dizer.

6
00:00:18.039 --> 00:00:21.000
Todo amor do mundo eu daria pra você.`

interface Cue {
  start: number
  end: number
  text: string
  lines: string[]
}

function parseSRT(raw: string): Cue[] {
  const blocks = raw.trim().split(/\n\s*\n/)
  return blocks.map(block => {
    const lines = block.trim().split('\n')
    const timeLine = lines[1] ?? ''
    const [startStr, endStr] = timeLine.split(/\s*-->\s*/)
    const rawText = lines.slice(2).join('\n').trim()
    const parts = rawText.split('/').map(l => l.trim()).filter(Boolean)
    return {
      start: srtTimeToSeconds(startStr?.trim() ?? '0'),
      end:   srtTimeToSeconds(endStr?.trim() ?? '0'),
      text:  rawText,
      lines: parts.length > 0 ? parts : [rawText],
    }
  }).filter(c => c.lines.length > 0)
}

const CUES = parseSRT(RAW_SRT)

export default function Page2({ isActive }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const rafRef   = useRef<number | null>(null)
  const [activeCue, setActiveCue] = useState<Cue | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isActive) {
      audio.currentTime = 0
      audio.play().catch(() => { /* blocked */ })
    } else {
      audio.pause()
    }
  }, [isActive])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tick = () => {
      const t = audio.currentTime
      const active = CUES.find(c => t >= c.start && t <= c.end) ?? null
      setActiveCue(prev => prev?.text === active?.text ? prev : active)
      rafRef.current = requestAnimationFrame(tick)
    }

    if (isActive) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setActiveCue(null)
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isActive])

  return (
    <div className="w-full h-full relative overflow-hidden">
      <img
        src={coverImage}
        alt="Página 2"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      <div
        className="absolute top-0 inset-x-0 z-20 flex items-start justify-center"
        style={{ paddingTop: '4%', paddingLeft: 16, paddingRight: 16 }}
      >
        <AnimatePresence mode="wait">
          {activeCue && (
            <motion.div
              key={activeCue.text}
              style={{
                background: 'rgba(10, 6, 4, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 16,
                padding: '12px 20px',
                border: '1px solid rgba(255,255,255,0.07)',
                maxWidth: '92%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              {activeCue.lines.map((line, i) => (
                <p
                  key={i}
                  className="font-sans text-center font-bold leading-tight"
                  style={{
                    fontSize: 'clamp(0.9rem, 4vw, 1.15rem)',
                    color: '#fff',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <audio
        ref={audioRef}
        src={songAudio}
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
    </div>
  )
}
