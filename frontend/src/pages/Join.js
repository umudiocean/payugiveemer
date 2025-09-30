import React, { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEventLogs } from 'viem'
import { toast } from 'sonner'
import { Copy, Download, CheckCircle, Loader2, ExternalLink } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import ConnectButton from '../components/ConnectButton'
import { CONTRACT_ADDRESS, CONTRACT_ABI, REGISTRATION_FEE } from '../config/wagmi'
import { generateTicket, copyToClipboard } from '../utils/ticket'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

const Join = () => {
  const { t } = useTranslation()
  const { address, isConnected } = useAccount()
  const [ticket, setTicket] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [registrationData, setRegistrationData] = useState(null)
  const [showTasks, setShowTasks] = useState(false)

  // Contract interactions
  const { writeContract, data: txHash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  // Check if user is already registered
  const { data: userIsRegistered, refetch: refetchRegistered } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'isRegistered',
    args: address ? [address] : undefined,
    enabled: !!address,
  })

  useEffect(() => {
    if (userIsRegistered) {
      setIsRegistered(true)
      // Load existing registration data if available
      loadUserRegistration()
    }
  }, [userIsRegistered, address])

  // Handle successful transaction
  useEffect(() => {
    if (isConfirmed && txHash) {
      handleRegistrationSuccess(txHash)
    }
  }, [isConfirmed, txHash])

  const loadUserRegistration = async () => {
    try {
      const response = await axios.get(`${API}/registration/${address}`)
      if (response.data.success) {
        setRegistrationData(response.data.data)
        setTicket(response.data.data.ticket)
        setShowTasks(true)
      }
    } catch (error) {
      console.error('Failed to load registration:', error)
    }
  }

  const handleRegistrationSuccess = async (txHash) => {
    try {
      // Wait a bit for the transaction to be fully processed
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Parse transaction receipt for events
      const receipt = await window.ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [txHash]
      })
      
      const logs = parseEventLogs({
        abi: CONTRACT_ABI,
        logs: receipt.logs
      })
      
      const registeredEvent = logs.find(log => log.eventName === 'Registered')
      
      if (registeredEvent) {
        const { user, index, seed, reward, timestamp } = registeredEvent.args
        const generatedTicket = generateTicket(seed, Number(index))
        
        // Save to backend
        const saveResponse = await axios.post(`${API}/save-ticket`, {
          wallet: address,
          txHash,
          index: Number(index),
          seed,
          ticket: generatedTicket,
          reward: reward.toString(),
          timestamp: Number(timestamp)
        })
        
        if (saveResponse.data.success) {
          setTicket(generatedTicket)
          setIsRegistered(true)
          setShowTasks(true)
          setRegistrationData(saveResponse.data.data)
          refetchRegistered()
          
          toast.success(t('messages.registrationSuccess'))
        }
      }
    } catch (error) {
      console.error('Failed to process registration:', error)
      toast.error(t('messages.registrationFailed'))
    }
  }

  const handleRegister = () => {
    if (!isConnected) {
      toast.error(t('messages.connectWallet'))
      return
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'register',
        value: BigInt(REGISTRATION_FEE)
      })
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error(t('messages.registrationError'))
    }
  }

  const handleCopyTicket = async () => {
    if (await copyToClipboard(ticket)) {
      toast.success(t('messages.ticketCopied'))
    } else {
      toast.error(t('messages.ticketCopyFailed'))
    }
  }

  const handleTaskClick = async (platform, handle = '') => {
    try {
      await axios.post(`${API}/task-click`, {
        wallet: address,
        platform,
        handle
      })
      toast.success(t('messages.taskCompleted', { platform }))
    } catch (error) {
      console.error('Failed to log task:', error)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{t('join.title')}</h1>
          <p className="text-squid-grey text-lg max-w-2xl mx-auto">
            {t('join.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Registration Card */}
          <Card className="bg-black/50 border-squid-grey/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <span>{t('join.registration')}</span>
                {isRegistered && <CheckCircle className="w-5 h-5 text-squid-success" />}
              </CardTitle>
              <CardDescription className="text-squid-grey">
                {isRegistered 
                  ? t('join.alreadyRegistered')
                  : t('join.connectToJoin')
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isConnected ? (
                <div>
                  <p className="text-squid-grey mb-4">{t('join.connectWallet')}</p>
                  <ConnectButton className="w-full" />
                </div>
              ) : isRegistered ? (
                <div className="text-center py-8 relative">
                  {/* Animated Success Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-squid-success/10 to-squid-teal/10 rounded-xl animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="relative">
                      <CheckCircle className="w-20 h-20 text-squid-success mx-auto mb-4 animate-bounce" />
                      <div className="absolute -top-2 -left-2 text-squid-pink text-lg animate-ping">◯</div>
                      <div className="absolute -top-2 -right-2 text-squid-teal text-lg animate-pulse">△</div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-squid-purple text-lg animate-bounce">⬜</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 animate-fade-in">{t('join.alreadyRegisteredTitle')}</h3>
                    <p className="text-squid-grey animate-fade-in">{t('join.alreadyRegisteredDesc')}</p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <span className="text-squid-success animate-pulse">●</span>
                      <span className="text-squid-success animate-pulse" style={{animationDelay: '0.2s'}}>●</span>
                      <span className="text-squid-success animate-pulse" style={{animationDelay: '0.4s'}}>●</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-squid-dark/80 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-medium text-white mb-4">{t('join.registrationDetails')}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-squid-grey">{t('join.instantReward')}:</span>
                        <span className="text-squid-teal font-medium">250,000,000 PAYU</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-squid-grey">{t('join.network')}:</span>
                        <span className="text-white font-medium">BSC Mainnet</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleRegister}
                    disabled={isPending || isConfirming}
                    className="w-full bg-gradient-to-r from-squid-pink to-squid-purple hover:from-squid-pink/80 hover:to-squid-purple/80 text-white font-bold py-4 px-6 rounded-2xl shadow-glow transition-all duration-300"
                    data-testid="register-btn"
                  >
                    {isPending || isConfirming ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {isPending ? t('join.confirming') : t('join.processing')}
                      </>
                    ) : (
                      t('join.registerButton')
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ticket Card */}
          <Card className="bg-black/50 border-squid-grey/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">{t('join.yourTicket')}</CardTitle>
              <CardDescription className="text-squid-grey">
                {ticket ? t('join.ticketGenerated') : t('join.ticketWillAppear')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ticket ? (
                <div className="space-y-6">
                  <div className="relative bg-gradient-to-br from-squid-pink/20 to-squid-purple/20 border-2 border-squid-pink/50 rounded-2xl p-8 text-center overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-6 gap-4 h-full items-center justify-items-center">
                        <div className="text-squid-pink animate-pulse">◯</div>
                        <div className="text-squid-teal animate-pulse" style={{animationDelay: '0.2s'}}>△</div>
                        <div className="text-squid-purple animate-pulse" style={{animationDelay: '0.4s'}}>⬜</div>
                        <div className="text-squid-purple animate-pulse" style={{animationDelay: '0.6s'}}>⬜</div>
                        <div className="text-squid-teal animate-pulse" style={{animationDelay: '0.8s'}}>△</div>
                        <div className="text-squid-pink animate-pulse" style={{animationDelay: '1s'}}>◯</div>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-4">
                        <div className="text-squid-pink text-lg animate-pulse mr-2">◯</div>
                        <div className="text-sm text-squid-grey animate-fade-in">{t('join.luckyTicket')}</div>
                        <div className="text-squid-teal text-lg animate-pulse ml-2">△</div>
                      </div>
                      
                      <div className="relative">
                        <div className="text-4xl font-bold text-white mb-6 font-mono animate-glow bg-gradient-to-r from-squid-pink to-squid-purple bg-clip-text text-transparent">
                          {ticket}
                        </div>
                        <div className="absolute -top-2 -left-4 text-squid-purple text-sm animate-bounce">⬜</div>
                        <div className="absolute -top-2 -right-4 text-squid-purple text-sm animate-bounce" style={{animationDelay: '0.5s'}}>⬜</div>
                      </div>
                      
                      <div className="flex space-x-4 justify-center">
                        <Button
                          onClick={handleCopyTicket}
                          variant="outline"
                          size="sm"
                          className="border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-black transition-all duration-300 transform hover:scale-105"
                          data-testid="copy-ticket-btn"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {t('join.copy')}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-squid-purple text-squid-purple hover:bg-squid-purple hover:text-white transition-all duration-300 transform hover:scale-105"
                          data-testid="download-ticket-btn"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {t('join.downloadPng')}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {registrationData && (
                    <div className="text-xs text-squid-grey space-y-1">
                      <div>Index: #{registrationData.index}</div>
                      {registrationData.txHash && (
                        <div>TX: {registrationData.txHash.slice(0, 10)}...{registrationData.txHash.slice(-8)}</div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-squid-grey/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-squid-grey text-4xl">🎫</span>
                  </div>
                  <p className="text-squid-grey">{t('join.completeRegistration')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Advanced Squid Game Tasks Section */}
        {showTasks && (
          <div className="mt-12 relative">
            {/* Main Tasks Container */}
            <div className="relative bg-squid-black/80 border-2 border-squid-red/50 rounded-3xl backdrop-blur-2xl overflow-hidden animate-squid-glow">
              
              {/* Dynamic Animated Background Grid */}
              <div className="absolute inset-0 opacity-15">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {[...Array(48)].map((_, i) => (
                    <div key={i} className="border border-squid-red/30 flex items-center justify-center group">
                      <span 
                        className={`text-xs transition-all duration-1000 ${
                          i % 3 === 0 ? 'text-squid-red animate-squid-pulse' :
                          i % 3 === 1 ? 'text-squid-ice-blue animate-squid-bounce' : 
                          'text-squid-gold animate-float'
                        }`} 
                        style={{animationDelay: `${i * 0.05}s`}}
                      >
                        {i % 3 === 0 ? '◯' : i % 3 === 1 ? '△' : '⬜'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Header Section */}
              <div className="relative z-10 p-8 pb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-squid-red to-squid-pink rounded-full flex items-center justify-center animate-squid-glow border-4 border-squid-light-pink/50">
                      <span className="text-white font-bold text-2xl animate-squid-bounce">◯</span>
                    </div>
                    <h2 className="text-4xl font-squid-display text-white animate-glow bg-gradient-to-r from-squid-red via-squid-pink to-squid-gold bg-clip-text text-transparent">
                      Complete Tasks to Earn Rewards
                    </h2>
                    <div className="w-14 h-14 bg-gradient-to-r from-squid-ice-blue to-squid-light-blue rounded-full flex items-center justify-center animate-squid-glow-blue border-4 border-squid-ice-blue/50">
                      <span className="text-white font-bold text-2xl animate-squid-bounce" style={{animationDelay: '0.3s'}}>△</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-squid-red/30 to-squid-pink/30 border-2 border-squid-red/60 rounded-full px-8 py-3 animate-pulse-glow">
                    <span className="text-squid-light-grey font-squid font-medium text-base flex items-center space-x-2">
                      <span className="text-squid-gold animate-squid-pulse">🎯</span>
                      <span>Sequential Game Unlock System</span>
                      <span className="text-squid-ice-blue animate-squid-bounce">⚡</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Tasks Grid */}
              <div className="relative z-10 px-8 pb-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  
                  {/* Game 1: Telegram Circle */}
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-squid-green via-squid-mint to-squid-green opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700 animate-squid-pulse"></div>
                    
                    <div className="relative bg-squid-black/90 border-2 border-squid-green/50 rounded-2xl p-8 backdrop-blur-xl overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:border-squid-green">
                      
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-squid-green text-9xl animate-squid-pulse">◯</span>
                        </div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        {/* Game Number */}
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-squid-green text-squid-black rounded-full mb-4 font-bold text-sm">
                          01
                        </div>
                        
                        {/* Game Symbol */}
                        <div className="w-20 h-20 mx-auto mb-6 bg-squid-green/10 border-2 border-squid-green rounded-full flex items-center justify-center group-hover:animate-squid-bounce">
                          <span className="text-squid-green text-4xl font-bold">◯</span>
                        </div>
                        
                        {/* Game Title */}
                        <h3 className="text-xl font-squid-display text-white mb-3">
                          {t('join.joinTelegram')}
                        </h3>
                        
                        {/* Game Description */}
                        <p className="text-squid-grey-light text-sm mb-6 font-squid">
                          Join our official Telegram community for latest updates and exclusive content
                        </p>
                        
                        {/* Action Button */}
                        <button
                          onClick={() => {
                            window.open('https://t.me/payu_coin', '_blank')
                            handleTaskClick('telegram')
                          }}
                          className="w-full bg-gradient-to-r from-squid-green to-squid-mint text-squid-black font-squid-display font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow-green"
                          data-testid="telegram-task-btn"
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <span>ENTER GAME</span>
                            <span className="text-xl">◯</span>
                          </span>
                        </button>
                        
                        {/* Reward Info */}
                        <div className="mt-4 text-xs text-squid-green font-squid">
                          +1 Extra Chance
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Game 2: X Triangle */}
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-squid-blue via-squid-navy to-squid-blue opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700 animate-squid-pulse" style={{animationDelay: '0.5s'}}></div>
                    
                    <div className="relative bg-squid-black/90 border-2 border-squid-blue/50 rounded-2xl p-8 backdrop-blur-xl overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:border-squid-blue">
                      
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-squid-blue text-9xl animate-squid-bounce">△</span>
                        </div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        {/* Game Number */}
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-squid-blue text-white rounded-full mb-4 font-bold text-sm">
                          02
                        </div>
                        
                        {/* Game Symbol */}
                        <div className="w-20 h-20 mx-auto mb-6 bg-squid-blue/10 border-2 border-squid-blue flex items-center justify-center group-hover:animate-squid-bounce" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
                          <span className="text-squid-blue text-3xl font-bold">△</span>
                        </div>
                        
                        {/* Game Title */}
                        <h3 className="text-xl font-squid-display text-white mb-3">
                          {t('join.retweetX')}
                        </h3>
                        
                        {/* Game Description */}
                        <p className="text-squid-grey-light text-sm mb-6 font-squid">
                          Retweet our announcement and spread the word about PAYU Draw
                        </p>
                        
                        {/* Action Button */}
                        <button
                          onClick={() => {
                            window.open('https://x.com/payu_coin', '_blank')
                            handleTaskClick('x')
                          }}
                          className="w-full bg-gradient-to-r from-squid-blue to-squid-navy text-white font-squid-display font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow-blue"
                          data-testid="x-task-btn"
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <span>ENTER GAME</span>
                            <span className="text-xl">△</span>
                          </span>
                        </button>
                        
                        {/* Reward Info */}
                        <div className="mt-4 text-xs text-squid-blue font-squid">
                          +1 Extra Chance
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Game 3: Instagram Square */}
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-squid-red via-squid-pink to-squid-red opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700 animate-squid-pulse" style={{animationDelay: '1s'}}></div>
                    
                    <div className="relative bg-squid-black/90 border-2 border-squid-red/50 rounded-2xl p-8 backdrop-blur-xl overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:border-squid-red">
                      
                      {/* Card Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-squid-red text-9xl animate-float">⬜</span>
                        </div>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        {/* Game Number */}
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-squid-red text-white rounded-full mb-4 font-bold text-sm">
                          03
                        </div>
                        
                        {/* Game Symbol */}
                        <div className="w-20 h-20 mx-auto mb-6 bg-squid-red/10 border-2 border-squid-red rounded-lg flex items-center justify-center group-hover:animate-squid-bounce">
                          <span className="text-squid-red text-4xl font-bold">⬜</span>
                        </div>
                        
                        {/* Game Title */}
                        <h3 className="text-xl font-squid-display text-white mb-3">
                          {t('join.shareInstagram')}
                        </h3>
                        
                        {/* Game Description */}
                        <p className="text-squid-grey-light text-sm mb-6 font-squid">
                          Share our story and tag your friends in this epic crypto adventure
                        </p>
                        
                        {/* Action Button */}
                        <button
                          onClick={() => {
                            window.open('https://www.instagram.com/payu.coin/', '_blank')
                            handleTaskClick('instagram_story')
                          }}
                          className="w-full bg-gradient-to-r from-squid-red to-squid-pink text-white font-squid-display font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow-red"
                          data-testid="instagram-task-btn"
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <span>ENTER GAME</span>
                            <span className="text-xl">⬜</span>
                          </span>
                        </button>
                        
                        {/* Reward Info */}
                        <div className="mt-4 text-xs text-squid-red font-squid">
                          +1 Extra Chance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="relative z-10 p-8 pt-4 border-t border-squid-grey-dark/30">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-6 mb-4">
                    <div className="flex space-x-2 animate-squid-pulse">
                      <span className="text-squid-red text-lg">●</span>
                      <span className="text-squid-green text-lg">▲</span>
                      <span className="text-squid-blue text-lg">■</span>
                    </div>
                    <span className="text-squid-grey-light font-squid text-sm">
                      Complete all games to maximize your winning chances
                    </span>
                    <div className="flex space-x-2 animate-squid-pulse" style={{animationDelay: '0.5s'}}>
                      <span className="text-squid-blue text-lg">■</span>
                      <span className="text-squid-green text-lg">▲</span>
                      <span className="text-squid-red text-lg">●</span>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center space-x-3 bg-squid-grey-dark/20 border border-squid-grey-dark/40 rounded-full px-6 py-2">
                    <span className="text-squid-green text-xs">◯</span>
                    <span className="text-squid-grey-light text-xs font-squid">
                      Total Games Completed: 0/3
                    </span>
                    <span className="text-squid-blue text-xs">△</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Join