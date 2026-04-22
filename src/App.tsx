import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import BookContainer from './components/BookContainer'

function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <div className="w-screen h-dvh overflow-hidden bg-[#0d0d0d] relative">
      {!splashDone && (
        <SplashScreen onComplete={() => setSplashDone(true)} />
      )}
      {splashDone && <BookContainer />}
    </div>
  )
}

export default App
