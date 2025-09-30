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

        {/* Tasks Section - Squid Game Style */}
        {showTasks && (
          <Card className="mt-8 bg-black/60 border-squid-pink/30 backdrop-blur-xl relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="animate-pulse text-squid-pink text-9xl font-bold flex items-center justify-center h-full">
                ◯ △ ⬜
              </div>
            </div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-white flex items-center space-x-3">
                <div className="w-8 h-8 bg-squid-pink rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold text-sm">◯</span>
                </div>
                <span>{t('join.bonusTasks')}</span>
              </CardTitle>
              <CardDescription className="text-squid-grey">
                {t('join.bonusTasksDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Telegram - Circle Shape */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-squid-teal/20 to-squid-teal/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Button
                    onClick={() => {
                      window.open('https://t.me/payu_coin', '_blank')
                      handleTaskClick('telegram')
                    }}
                    variant="outline"
                    className="relative w-32 h-32 rounded-full border-2 border-squid-teal bg-black/80 backdrop-blur-sm text-squid-teal hover:bg-squid-teal hover:text-black transition-all duration-500 transform hover:scale-110 hover:rotate-12 group mx-auto"
                    data-testid="telegram-task-btn"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2 group-hover:animate-bounce">◯</div>
                      <div className="text-sm font-medium">{t('join.joinTelegram')}</div>
                    </div>
                  </Button>
                </div>

                {/* X (Twitter) - Triangle Shape */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-squid-purple/20 to-squid-purple/40 blur-xl group-hover:blur-2xl transition-all duration-500" 
                       style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                  <Button
                    onClick={() => {
                      window.open('https://x.com/payu_coin', '_blank')
                      handleTaskClick('x')
                    }}
                    variant="outline"
                    className="relative w-32 h-32 border-2 border-squid-purple bg-black/80 backdrop-blur-sm text-squid-purple hover:bg-squid-purple hover:text-white transition-all duration-500 transform hover:scale-110 hover:-rotate-12 group mx-auto"
                    style={{clipPath: 'polygon(50% 15%, 15% 85%, 85% 85%)'}}
                    data-testid="x-task-btn"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2 group-hover:animate-pulse">△</div>
                      <div className="text-xs font-medium">{t('join.retweetX')}</div>
                    </div>
                  </Button>
                </div>

                {/* Instagram - Square Shape */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-squid-pink/20 to-squid-pink/40 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Button
                    onClick={() => {
                      window.open('https://www.instagram.com/payu.coin/', '_blank')
                      handleTaskClick('instagram_story')
                    }}
                    variant="outline"
                    className="relative w-32 h-32 border-2 border-squid-pink bg-black/80 backdrop-blur-sm text-squid-pink hover:bg-squid-pink hover:text-white transition-all duration-500 transform hover:scale-110 hover:rotate-45 group mx-auto"
                    data-testid="instagram-task-btn"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2 group-hover:animate-spin">⬜</div>
                      <div className="text-xs font-medium">{t('join.shareInstagram')}</div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Additional Squid Game Elements */}
              <div className="mt-8 pt-6 border-t border-squid-grey/20">
                <div className="flex items-center justify-center space-x-8">
                  <div className="animate-pulse">
                    <span className="text-squid-pink text-2xl">●</span>
                    <span className="text-squid-teal text-2xl mx-2">▲</span>
                    <span className="text-squid-purple text-2xl">■</span>
                  </div>
                  <div className="text-squid-grey text-sm animate-fade-in">
                    Complete all games to maximize your chances
                  </div>
                  <div className="animate-pulse">
                    <span className="text-squid-purple text-2xl">■</span>
                    <span className="text-squid-teal text-2xl mx-2">▲</span>
                    <span className="text-squid-pink text-2xl">●</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Join