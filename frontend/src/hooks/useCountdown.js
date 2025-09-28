import { useState, useEffect } from 'react'
import { formatCountdown } from '../utils/ticket'

// Fixed countdown showing 45 days (not started yet)
// This will show a static countdown of 44:23:59:59
const FIXED_COUNTDOWN = {
  days: 44,
  hours: 23,
  minutes: 59,
  seconds: 59
}

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