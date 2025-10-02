import { useState, useEffect } from 'react'
import axios from 'axios'
import { formatCountdown } from '../utils/ticket'

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api'

export function useCountdown() {
  const [giveawayStarted, setGiveawayStarted] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  
  // Check giveaway status from backend
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(`${API}/giveaway-status`)
        if (response.data.success) {
          setGiveawayStarted(response.data.started)
          if (response.data.start_time) {
            setStartTime(new Date(response.data.start_time))
          }
        }
      } catch (error) {
        console.error('Failed to get giveaway status:', error)
      }
    }
    
    checkStatus()
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000)
    return () => clearInterval(interval)
  }, [])
  
  // Calculate countdown
  useEffect(() => {
    if (!giveawayStarted || !startTime) return
    
    const calculateTimeLeft = () => {
      const now = new Date()
      const endDate = new Date(startTime)
      endDate.setDate(endDate.getDate() + 45) // 45 days from start
      
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
  }, [giveawayStarted, startTime])
  
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
    isActive: giveawayStarted,
    giveawayStarted
  }
}