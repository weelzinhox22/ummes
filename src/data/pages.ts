export interface ScrapPage {
  id: number
  theme: 'light' | 'dark' | 'blush' | 'forest'
  title?: string
  body: string
  date?: string
  photos: { src: string; alt: string; rotate: number; zIndex: number; top?: string; bottom?: string; left?: string; right?: string }[]
  stickers: { emoji: string; top?: string; bottom?: string; left?: string; right?: string; rotate: number; size: number }[]
  tapes: { top?: string; bottom?: string; left?: string; right?: string; rotate: number; color: 'yellow' | 'pink' | 'blue' | 'mint' }[]
  accentColor: string
}

export const pages: ScrapPage[] = [
  {
    id: 1,
    theme: 'dark',
    title: 'Capítulo 01',
    body: 'O dia que tudo começou... Meu coração soube antes da minha cabeça.',
    date: '22 de Março, 2025',
    photos: [
      { src: 'https://picsum.photos/seed/love1/300/350', alt: 'Nossa primeira foto', rotate: -4, zIndex: 2, top: '8%', left: '5%' },
      { src: 'https://picsum.photos/seed/love2/280/320', alt: 'Momento especial', rotate: 3, zIndex: 3, top: '15%', right: '4%' },
    ],
    stickers: [
      { emoji: '🌹', top: '6%', right: '6%', rotate: 12, size: 32 },
      { emoji: '✨', bottom: '22%', left: '8%', rotate: -5, size: 28 },
      { emoji: '💕', bottom: '12%', right: '10%', rotate: 8, size: 26 },
    ],
    tapes: [
      { top: '8%', left: '2%', rotate: -8, color: 'pink' },
      { top: '14%', right: '0%', rotate: 6, color: 'yellow' },
    ],
    accentColor: '#e8747c',
  },
  {
    id: 2,
    theme: 'blush',
    title: 'Nossa Primeira Saída',
    body: 'Rimos de tudo e de nada. O tempo parou só pra nós dois.',
    date: '29 de Março, 2025',
    photos: [
      { src: 'https://picsum.photos/seed/date1/320/280', alt: 'Nosso passeio', rotate: 2, zIndex: 2, top: '10%', left: '10%' },
      { src: 'https://picsum.photos/seed/date2/260/300', alt: 'Momento mágico', rotate: -6, zIndex: 3, top: '35%', right: '6%' },
      { src: 'https://picsum.photos/seed/date3/240/200', alt: 'Sorrindo', rotate: 4, zIndex: 1, bottom: '10%', left: '5%' },
    ],
    stickers: [
      { emoji: '☕', top: '8%', right: '5%', rotate: -8, size: 30 },
      { emoji: '🎶', bottom: '18%', right: '8%', rotate: 5, size: 26 },
      { emoji: '🌙', top: '20%', left: '5%', rotate: -12, size: 28 },
    ],
    tapes: [
      { top: '10%', left: '6%', rotate: 5, color: 'blue' },
      { bottom: '10%', right: '5%', rotate: -4, color: 'pink' },
    ],
    accentColor: '#c2706e',
  },
  {
    id: 3,
    theme: 'dark',
    title: 'Mensagens às 3h',
    body: 'Você roubou meu sono e não se arrependeu nem um pouco. Eu, também não.',
    date: 'Uma semana depois...',
    photos: [
      { src: 'https://picsum.photos/seed/night1/290/320', alt: 'Noite de conversa', rotate: -3, zIndex: 2, top: '8%', right: '8%' },
    ],
    stickers: [
      { emoji: '🌙', top: '5%', left: '8%', rotate: -10, size: 36 },
      { emoji: '⭐', bottom: '25%', left: '12%', rotate: 5, size: 28 },
      { emoji: '📱', bottom: '15%', right: '10%', rotate: -6, size: 30 },
      { emoji: '💬', top: '45%', left: '6%', rotate: 8, size: 26 },
    ],
    tapes: [
      { top: '8%', right: '4%', rotate: 8, color: 'mint' },
    ],
    accentColor: '#9b59b6',
  },
  {
    id: 4,
    theme: 'light',
    title: 'Lugares Nossos',
    body: 'Todo lugar fica mais bonito quando você está do lado. Viraram os nossos.',
    date: 'Semana 2',
    photos: [
      { src: 'https://picsum.photos/seed/place1/310/260', alt: 'Lugar favorito', rotate: 5, zIndex: 2, top: '6%', left: '4%' },
      { src: 'https://picsum.photos/seed/place2/270/290', alt: 'Nossa vista', rotate: -4, zIndex: 3, top: '30%', right: '5%' },
      { src: 'https://picsum.photos/seed/place3/250/220', alt: 'Passeio', rotate: 2, zIndex: 1, bottom: '8%', left: '8%' },
    ],
    stickers: [
      { emoji: '📍', top: '4%', right: '8%', rotate: -5, size: 28 },
      { emoji: '🌸', bottom: '20%', right: '10%', rotate: 10, size: 32 },
    ],
    tapes: [
      { top: '6%', left: '4%', rotate: -6, color: 'yellow' },
      { top: '30%', right: '2%', rotate: 4, color: 'pink' },
      { bottom: '8%', left: '5%', rotate: -3, color: 'blue' },
    ],
    accentColor: '#e8747c',
  },
  {
    id: 5,
    theme: 'blush',
    title: 'As Coisas Pequenas',
    body: 'Seu jeito de rir. A forma como você me olha. São essas coisas que me prendem.',
    date: 'Semana 3',
    photos: [
      { src: 'https://picsum.photos/seed/small1/300/340', alt: 'Detalhe especial', rotate: -5, zIndex: 2, top: '5%', left: '6%' },
      { src: 'https://picsum.photos/seed/small2/260/280', alt: 'Momento íntimo', rotate: 4, zIndex: 3, top: '20%', right: '5%' },
    ],
    stickers: [
      { emoji: '🫶', top: '3%', right: '8%', rotate: -8, size: 34 },
      { emoji: '🌷', bottom: '12%', left: '6%', rotate: 6, size: 30 },
      { emoji: '💌', bottom: '20%', right: '8%', rotate: -4, size: 26 },
    ],
    tapes: [
      { top: '5%', left: '4%', rotate: 7, color: 'pink' },
      { top: '20%', right: '2%', rotate: -5, color: 'yellow' },
    ],
    accentColor: '#f06292',
  },
  {
    id: 6,
    theme: 'forest',
    title: 'Te Descobrindo',
    body: 'Cada conversa é uma nova camada. Tenho a sensação de que vou adorar tudo que ainda vem.',
    date: 'Semana 3',
    photos: [
      { src: 'https://picsum.photos/seed/disc1/320/360', alt: 'Explorando', rotate: 3, zIndex: 2, top: '6%', right: '5%' },
    ],
    stickers: [
      { emoji: '🔍', top: '5%', left: '8%', rotate: -10, size: 30 },
      { emoji: '🌿', bottom: '18%', left: '10%', rotate: 5, size: 32 },
      { emoji: '🦋', bottom: '10%', right: '8%', rotate: -6, size: 28 },
      { emoji: '✨', top: '30%', left: '6%', rotate: 8, size: 26 },
    ],
    tapes: [
      { top: '6%', right: '3%', rotate: -6, color: 'mint' },
    ],
    accentColor: '#66bb6a',
  },
]
