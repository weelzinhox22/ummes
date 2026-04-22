import { useEffect, useRef } from 'react'
import coverImage from '../assets/amorsemmedida.webp'
import songAudio from '../assets/amorsemmedida.mp3'

interface Props {
  isActive: boolean
}

export default function Page4({ isActive }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)

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

  return (
    <div className="w-full h-full relative overflow-hidden">
      <img
        src={coverImage}
        alt="Página 4"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

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
