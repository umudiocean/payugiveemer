import { useState, useEffect } from 'react'
import { formatCountdown } from '../utils/ticket'

// Set a fixed end date - 45 days from now
// You can change this date to your desired end date
const getEndDate = () => {
  const now = new Date()
  const endDate = new Date(now)
  endDate.setDate(endDate.getDate() + 45) // 45 days from now
  return endDate
}

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [endDate] = useState(getEndDate())
  
  // Calculate countdown every second
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = endDate - now
      
      if (diff <= 0) {
        setTimeLeft(0)
        return
      }
      
      setTimeLeft(diff)
    }
    
    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    
    return () => clearInterval(interval)
  }, [endDate])
  
  // Format time
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
  
  const formatted = {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
  
  return {
    timeLeft,
    formatted,
    isEnded: timeLeft <= 0,
    isActive: true
  }
}