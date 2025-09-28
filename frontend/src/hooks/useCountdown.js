import { useState, useEffect } from 'react'
import { formatCountdown } from '../utils/ticket'

// Draw starts from current date
// 44 days from now
const DRAW_START = Date.now()
const DRAW_END = DRAW_START + (44 * 24 * 60 * 60 * 1000) // 44 days in milliseconds

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(DRAW_END - Date.now())
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return

    const interval = setInterval(() => {
      const newTimeLeft = DRAW_END - Date.now()
      setTimeLeft(newTimeLeft)
      
      if (newTimeLeft <= 0) {
        setIsActive(false)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const formatted = formatCountdown(Math.max(0, timeLeft))
  
  return {
    timeLeft: Math.max(0, timeLeft),
    formatted,
    isEnded: timeLeft <= 0,
    isActive
  }
}