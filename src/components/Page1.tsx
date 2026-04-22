import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import coverImage from '../assets/pg1vagabundotbmama.webp'
import songAudio from '../assets/vagabundotbmama.mp3'

interface Props {
  isActive: boolean
}

// ── SRT timestamp → seconds ──────────────────────────────────────────────────
function srtTimeToSeconds(t: string): number {
  // Accepts  HH:MM:SS,mmm  or  HH:MM:SS.mmm
  const clean = t.replace(',', '.')
  const [hms, ms = '0'] = clean.split('.')
  const parts = hms.split(':').map(Number)
  const [h = 0, m = 0, s = 0] = parts
  return h * 3600 + m * 60 + s + Number(ms) / 1000
}

// ── Inline SRT content (parsed from vagabundotbmama.srt) ─────────────────────
const RAW_SRT = `1
00:00:00.099 --> 00:00:05.480
Se você é aurora eu sou o fim de tarde/ Você é agora e eu sou

2
00:00:05.539 --> 00:00:09.300
um pouco mais tarde/ Você correria na hora da alvorada, Eu sou

3
00:00:09.359 --> 00:00:13.859
preguiça/ Faço história nas madrugadas/ Você é Paris, gata, eu

4
00:00:13.920 --> 00:00:17.539
sou Bangkok/ Você sempre feliz E eu sempre muito loca/ E você

5
00:00:17.639 --> 00:00:20.840
cera me dá anti-frizz, eu quase com dreadlock/ Você Grande Rio

6
00:00:20.899 --> 00:00:24.180
Imperatriz, Eu, sessenta e nove Woodstock/ Você like as de six,

7
00:00:24.279 --> 00:00:28.039
eu rock das antiga/ Você pratica e determinado, eu evito a fadiga/

8
00:00:28.059 --> 00:00:31.379
Você deita na ganga só, eu altinha ganja trilha/ Você quer ver

9
00:00:31.420 --> 00:00:31.739
minha avó...`

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
    // line 0 = index, line 1 = timing, line 2+ = text
    const timeLine = lines[1] ?? ''
    const [startStr, endStr] = timeLine.split(/\s*-->\s*/)
    const raw = lines.slice(2).join('\n').trim()
    const parts = raw.split('/').map(l => l.trim()).filter(Boolean)
    return {
      start: srtTimeToSeconds(startStr?.trim() ?? '0'),
      end:   srtTimeToSeconds(endStr?.trim() ?? '0'),
      text:  raw,
      lines: parts,
    }
  }).filter(c => c.lines.length > 0)
}

const CUES = parseSRT(RAW_SRT)

// ─────────────────────────────────────────────────────────────────────────────

export default function Page1({ isActive }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const rafRef   = useRef<number | null>(null)
  const [activeCue, setActiveCue] = useState<Cue | null>(null)

  // ── Audio play / pause ───────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isActive) {
      audio.currentTime = 0
      audio.play().catch(() => { /* autoplay bloqueado */ })
    } else {
      audio.pause()
    }
  }, [isActive])

  // ── Subtitle loop (rAF) ──────────────────────────────────────────────────
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

      {/* ── Imagem de capa ── */}
      <img
        src={coverImage}
        alt="Página 1"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* ── Legenda sincronizada ── */}
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

      {/* ── Áudio oculto ── */}
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
