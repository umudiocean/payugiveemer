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
  const [currentSeconds, setCurrentSeconds] = useState(59)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSeconds(prev => prev === 0 ? 59 : prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Fixed countdown with animated seconds
  const formatted = {
    days: FIXED_COUNTDOWN.days.toString().padStart(2, '0'),
    hours: FIXED_COUNTDOWN.hours.toString().padStart(2, '0'), 
    minutes: FIXED_COUNTDOWN.minutes.toString().padStart(2, '0'),
    seconds: currentSeconds.toString().padStart(2, '0')
  }
  
  return {
    timeLeft: 45 * 24 * 60 * 60 * 1000, // 45 days in milliseconds
    formatted,
    isEnded: false,
    isActive: true
  }
}