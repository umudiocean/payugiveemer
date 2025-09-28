import React from 'react'
import { useCountdown } from '../hooks/useCountdown'
import { Clock } from 'lucide-react'

const CountdownTimer = ({ className = '' }) => {
  const { formatted, isEnded } = useCountdown()

  if (isEnded) {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <Clock className="w-6 h-6 text-squid-error" />
        <span className="text-2xl font-bold text-squid-error">DRAW ENDED</span>
      </div>
    )
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Clock className="w-5 h-5 text-squid-teal" />
        <span className="text-squid-grey text-sm">Draw ends in</span>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-squid-pink/20 to-squid-purple/20 border border-squid-pink/30 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{formatted.days}</span>
          </div>
          <div className="text-xs text-squid-grey mt-1">DAYS</div>
        </div>
        
        <div className="text-squid-pink text-2xl font-bold">:</div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-squid-teal/20 to-squid-purple/20 border border-squid-teal/30 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{formatted.hours}</span>
          </div>
          <div className="text-xs text-squid-grey mt-1">HOURS</div>
        </div>
        
        <div className="text-squid-pink text-2xl font-bold">:</div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-squid-purple/20 to-squid-pink/20 border border-squid-purple/30 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{formatted.minutes}</span>
          </div>
          <div className="text-xs text-squid-grey mt-1">MINS</div>
        </div>
        
        <div className="text-squid-pink text-2xl font-bold">:</div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-squid-pink/20 to-squid-teal/20 border border-squid-pink/30 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{formatted.seconds}</span>
          </div>
          <div className="text-xs text-squid-grey mt-1">SECS</div>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer