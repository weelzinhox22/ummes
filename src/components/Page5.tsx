import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import coverImage from '../assets/psiloveyou.webp'
import songAudio from '../assets/psiloveyou.mp3'

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
00:00:00.699 --> 00:00:03.259
I love you, I love you.

2
00:00:03.559 --> 00:00:08.000
I love you in every universe.

3
00:00:09.399 --> 00:00:13.659
You'll always be the first.

4
00:00:15.019 --> 00:00:19.180
Love you, you're my only one.

5
00:00:23.260 --> 00:00:25.419
I love you, I do.

6
00:00:26.299 --> 00:00:29.020
Love you still, I always will.

7
00:00:29.020 --> 00:00:30.000
Always will.

8
00:00:31.739 --> 00:00:36.020
I want you to know how I feel.

9
00:00:36.059 --> 00:00:36.360
How I feel.

10
00:00:37.279 --> 00:00:42.000
And all the promise that I'll fulfill.

11
00:00:44.599 --> 00:00:47.559
My only one.

12
00:00:50.239 --> 00:00:52.299
My only one.`

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

export default function Page5({ isActive }: Props) {
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
        alt="Página 5"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'left center' }}
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
