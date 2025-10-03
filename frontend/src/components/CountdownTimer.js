import React from 'react'
// English only - no i18n needed
import { useCountdown } from '../hooks/useCountdown'
import { Clock, Circle, Triangle, Square } from 'lucide-react'

const CountdownTimer = ({ className = '' }) => {
  const { formatted, isEnded } = useCountdown()

  return (
    <div className={`text-center relative ${className}`}>
      {/* Payu Squid Game floating shapes around countdown */}
      <div className="absolute inset-0 pointer-events-none">
        <Circle className="absolute -top-4 -left-4 w-6 h-6 text-squid-pink/20 animate-float" />
        <Triangle className="absolute -top-2 -right-6 w-4 h-4 text-squid-teal/25 animate-float" style={{animationDelay: '1s'}} />
        <Square className="absolute -bottom-6 -left-2 w-5 h-5 text-squid-purple/20 animate-float" style={{animationDelay: '2s'}} />
        <Circle className="absolute -bottom-4 -right-4 w-3 h-3 text-squid-pink/30 animate-float" style={{animationDelay: '3s'}} />
      </div>
      
      <div className="flex items-center justify-center space-x-3 mb-4">
        <Clock className="w-6 h-6 text-squid-teal animate-pulse" />
        <span className="text-squid-grey text-lg font-medium">Time remaining until the end of the giveaway</span>
        <Clock className="w-6 h-6 text-squid-teal animate-pulse" style={{animationDelay: '0.5s'}} />
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <div className="text-center group">
          <div className="w-20 h-20 bg-gradient-to-br from-squid-pink/20 to-squid-purple/20 border-2 border-squid-pink/40 rounded-3xl flex items-center justify-center shadow-glow group-hover:shadow-glow transition-all duration-300 relative overflow-hidden">
            {/* Payu Squid Game shape overlay */}
            <Circle className="absolute top-1 right-1 w-3 h-3 text-squid-pink/30" />
            <span className="text-3xl font-bold text-white relative z-10">{formatted.days}</span>
          </div>
          <div className="text-sm text-squid-grey mt-2 font-medium">DAYS</div>
        </div>
        
        <div className="text-squid-pink text-3xl font-bold animate-pulse">:</div>
        
        <div className="text-center group">
          <div className="w-20 h-20 bg-gradient-to-br from-squid-teal/20 to-squid-purple/20 border-2 border-squid-teal/40 rounded-3xl flex items-center justify-center shadow-glow-teal group-hover:shadow-glow-teal transition-all duration-300 relative overflow-hidden">
            <Triangle className="absolute top-1 right-1 w-3 h-3 text-squid-teal/30" />
            <span className="text-3xl font-bold text-white relative z-10">{formatted.hours}</span>
          </div>
          <div className="text-sm text-squid-grey mt-2 font-medium">HOURS</div>
        </div>
        
        <div className="text-squid-pink text-3xl font-bold animate-pulse" style={{animationDelay: '0.5s'}}>:</div>
        
        <div className="text-center group">
          <div className="w-20 h-20 bg-gradient-to-br from-squid-purple/20 to-squid-pink/20 border-2 border-squid-purple/40 rounded-3xl flex items-center justify-center shadow-glow-purple group-hover:shadow-glow-purple transition-all duration-300 relative overflow-hidden">
            <Square className="absolute top-1 right-1 w-3 h-3 text-squid-purple/30" />
            <span className="text-3xl font-bold text-white relative z-10">{formatted.minutes}</span>
          </div>
          <div className="text-sm text-squid-grey mt-2 font-medium">MINS</div>
        </div>
        
        <div className="text-squid-pink text-3xl font-bold animate-pulse">:</div>
        
        <div className="text-center group">
          <div className="w-20 h-20 bg-gradient-to-br from-squid-pink/20 to-squid-teal/20 border-2 border-squid-pink/40 rounded-3xl flex items-center justify-center shadow-glow group-hover:shadow-glow transition-all duration-300 relative overflow-hidden">
            <Circle className="absolute top-1 right-1 w-3 h-3 text-squid-pink/30" />
            <span className="text-3xl font-bold text-white relative z-10 animate-pulse">{formatted.seconds}</span>
          </div>
          <div className="text-sm text-squid-grey mt-2 font-medium">SECS</div>
        </div>
      </div>
      
      {/* Payu Squid Game motto */}
      <div className="mt-6 text-squid-grey/60 text-sm italic">
        "The game has not begun yet..."
      </div>
    </div>
  )
}

export default CountdownTimer