import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Coins, Trophy, Users, Zap, Circle, Triangle, Square } from 'lucide-react'
import { Button } from '../components/ui/button'
import CountdownTimer from '../components/CountdownTimer'

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8YmxhY2t8MTc1OTA0MDA1OXww&ixlib=rb-4.1.0&q=85"
            alt="Dark corridor background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Enhanced Logo/Brand with Squid Game elements */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              <img 
                src="https://customer-assets.emergentagent.com/job_payu-raffle/artifacts/t3f72s82_payumain.jpg"
                alt="Payu Logo"
                className="w-32 h-32 mx-auto rounded-3xl shadow-glow mb-4 border-2 border-squid-pink/30 bg-black p-2"
              />
              {/* Floating shapes around logo */}
              <Circle className="absolute -top-2 -left-2 w-4 h-4 text-squid-pink animate-float" />
              <Triangle className="absolute -top-1 -right-3 w-3 h-3 text-squid-teal animate-float" style={{animationDelay: '1s'}} />
              <Square className="absolute -bottom-2 -right-2 w-4 h-4 text-squid-purple animate-float" style={{animationDelay: '2s'}} />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-squid-pink to-squid-teal bg-clip-text text-transparent">
              Payu Squid-Grade Draw
            </span>
            <br />
            <span className="text-white text-3xl md:text-5xl font-medium">
              for Early PAYU Hunters
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-squid-grey mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect your wallet, join with one transaction, get your ticket.
            <br className="hidden sm:block" />
            <span className="text-squid-teal font-medium">Rewards land instantly in your wallet.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Link to="/join">
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-squid-pink to-squid-purple hover:from-squid-pink/80 hover:to-squid-purple/80 text-white font-bold py-4 px-8 rounded-2xl shadow-glow transition-all duration-300 hover:shadow-glow active:scale-95 text-lg"
                data-testid="join-draw-btn"
              >
                Join the Draw
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/join">
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-2 border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-squid-dark font-medium py-4 px-8 rounded-2xl transition-all duration-300"
                data-testid="connect-wallet-btn"
              >
                Connect Wallet
              </Button>
            </Link>
          </div>

          {/* Countdown */}
          <CountdownTimer className="mb-16" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-black/90">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-squid-grey text-lg max-w-2xl mx-auto">Simple, transparent, and instant. Join the draw in three easy steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group relative">
              {/* Floating shapes around feature */}
              <Circle className="absolute -top-2 -left-2 w-3 h-3 text-squid-pink/20 animate-float" />
              <div className="w-24 h-24 bg-gradient-to-br from-squid-pink/20 to-squid-purple/20 border-2 border-squid-pink/40 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300 relative">
                <Zap className="w-12 h-12 text-squid-pink" />
                <Square className="absolute top-1 right-1 w-3 h-3 text-squid-pink/30" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center space-x-2">
                <Circle className="w-4 h-4 text-squid-pink" />
                <span>Connect & Register</span>
              </h3>
              <p className="text-squid-grey leading-relaxed">
                Connect your wallet and call register() with exactly 0.00098 BNB. 
                Simple one-click transaction.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group relative">
              <Triangle className="absolute -top-1 -right-3 w-4 h-4 text-squid-teal/25 animate-float" style={{animationDelay: '1s'}} />
              <div className="w-24 h-24 bg-gradient-to-br from-squid-teal/20 to-squid-purple/20 border-2 border-squid-teal/40 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow-teal transition-all duration-300 relative">
                <Coins className="w-12 h-12 text-squid-teal" />
                <Triangle className="absolute top-1 right-1 w-3 h-3 text-squid-teal/30" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center space-x-2">
                <Triangle className="w-4 h-4 text-squid-teal" />
                <span>Instant Rewards</span>
              </h3>
              <p className="text-squid-grey leading-relaxed">
                Receive 250,000,000 PAYU tokens instantly in your wallet. 
                No waiting, no claims.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group relative">
              <Square className="absolute -bottom-3 -left-1 w-3 h-3 text-squid-purple/20 animate-float" style={{animationDelay: '2s'}} />
              <div className="w-24 h-24 bg-gradient-to-br from-squid-purple/20 to-squid-pink/20 border-2 border-squid-purple/40 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow-purple transition-all duration-300 relative">
                <Trophy className="w-12 h-12 text-squid-purple" />
                <Square className="absolute top-1 right-1 w-3 h-3 text-squid-purple/30" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center space-x-2">
                <Square className="w-4 h-4 text-squid-purple" />
                <span>Get Your Ticket</span>
              </h3>
              <p className="text-squid-grey leading-relaxed">
                Your unique lottery ticket is generated from the blockchain seed. 
                Screenshot and save it!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-squid-pink mb-2">0.00098</div>
              <div className="text-squid-grey text-sm">BNB Entry Fee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-squid-teal mb-2">250M</div>
              <div className="text-squid-grey text-sm">PAYU Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-squid-purple mb-2">44</div>
              <div className="text-squid-grey text-sm">Days to Enter</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">BSC</div>
              <div className="text-squid-grey text-sm">Mainnet</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-squid-dark via-squid-pink/10 to-squid-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join?</h2>
          <p className="text-squid-grey text-lg mb-8 max-w-2xl mx-auto">
            Don't miss your chance to be part of the PAYU ecosystem. 
            Join thousands of early hunters in this exclusive draw.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/join">
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-squid-pink to-squid-purple hover:from-squid-pink/80 hover:to-squid-purple/80 text-white font-bold py-4 px-12 rounded-2xl shadow-glow transition-all duration-300 hover:shadow-glow active:scale-95 text-lg"
                data-testid="get-started-btn"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home