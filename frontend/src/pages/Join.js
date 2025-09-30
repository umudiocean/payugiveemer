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
          refetchRegistered()
          
          toast.success(t('messages.registrationSuccess'))
        }
      }
    } catch (error) {
      console.error('Failed to process registration:', error)
      toast.error('Registration succeeded but failed to generate ticket. Please contact support.')
    }
  }

  const handleRegister = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
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
      toast.error('Failed to register. Please try again.')
    }
  }

  const handleCopyTicket = async () => {
    if (await copyToClipboard(ticket)) {
      toast.success('Ticket copied to clipboard!')
    } else {
      toast.error('Failed to copy ticket')
    }
  }

  const handleTaskClick = async (platform, handle = '') => {
    try {
      await axios.post(`${API}/task-click`, {
        wallet: address,
        platform,
        handle
      })
      toast.success(`${platform} task completed!`)
    } catch (error) {
      console.error('Failed to log task:', error)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Join the Draw</h1>
          <p className="text-squid-grey text-lg max-w-2xl mx-auto">
            Connect your wallet and register with one simple transaction. 
            Get 250M PAYU tokens instantly plus your unique lottery ticket.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Registration Card */}
          <Card className="bg-black/50 border-squid-grey/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <span>Registration</span>
                {isRegistered && <CheckCircle className="w-5 h-5 text-squid-success" />}
              </CardTitle>
              <CardDescription className="text-squid-grey">
                {isRegistered 
                  ? 'You are already registered for the draw!' 
                  : 'One transaction to join the draw and receive rewards'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isConnected ? (
                <div>
                  <p className="text-squid-grey mb-4">Connect your wallet to continue</p>
                  <ConnectButton className="w-full" />
                </div>
              ) : isRegistered ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-squid-success mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Already Registered!</h3>
                  <p className="text-squid-grey">You have successfully joined the draw.</p>
                </div>
              ) : (
                <div>
                  <div className="bg-squid-dark/80 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-medium text-white mb-4">Registration Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-squid-grey">Instant Reward:</span>
                        <span className="text-squid-teal font-medium">250,000,000 PAYU</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-squid-grey">Network:</span>
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
                        {isPending ? 'Confirming...' : 'Processing...'}
                      </>
                    ) : (
                      'Register'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ticket Card */}
          <Card className="bg-black/50 border-squid-grey/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Your Lottery Ticket</CardTitle>
              <CardDescription className="text-squid-grey">
                {ticket ? 'Your unique ticket has been generated!' : 'Your ticket will appear here after registration'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ticket ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-squid-pink/10 to-squid-purple/10 border border-squid-pink/30 rounded-2xl p-6 text-center">
                    <div className="text-sm text-squid-grey mb-2">Lucky Ticket Number</div>
                    <div className="text-3xl font-bold text-white mb-4 font-mono">{ticket}</div>
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleCopyTicket}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-squid-dark"
                        data-testid="copy-ticket-btn"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-squid-purple text-squid-purple hover:bg-squid-purple hover:text-white"
                        data-testid="download-ticket-btn"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PNG
                      </Button>
                    </div>
                  </div>

                  {registrationData && (
                    <div className="text-xs text-squid-grey space-y-1">
                      <div>Index: #{registrationData.index}</div>
                      <div>TX: {registrationData.txHash.slice(0, 10)}...{registrationData.txHash.slice(-8)}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-squid-grey/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-squid-grey text-4xl">🎫</span>
                  </div>
                  <p className="text-squid-grey">Complete registration to get your ticket</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tasks Section */}
        {showTasks && (
          <Card className="mt-8 bg-black/50 border-squid-grey/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Bonus Tasks</CardTitle>
              <CardDescription className="text-squid-grey">
                Complete these tasks to boost your chances (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  onClick={() => {
                    window.open('https://t.me/payucommunity', '_blank')
                    handleTaskClick('telegram')
                  }}
                  variant="outline"
                  className="h-20 border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-squid-dark"
                  data-testid="telegram-task-btn"
                >
                  <div className="text-center">
                    <div className="font-medium">Join Telegram</div>
                    <ExternalLink className="w-4 h-4 mx-auto mt-1" />
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    window.open('https://twitter.com/payunetwork', '_blank')
                    handleTaskClick('x')
                  }}
                  variant="outline"
                  className="h-20 border-squid-purple text-squid-purple hover:bg-squid-purple hover:text-white"
                  data-testid="twitter-task-btn"
                >
                  <div className="text-center">
                    <div className="font-medium">Retweet on X</div>
                    <ExternalLink className="w-4 h-4 mx-auto mt-1" />
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    window.open('https://instagram.com/payunetwork', '_blank')
                    handleTaskClick('instagram_story')
                  }}
                  variant="outline"
                  className="h-20 border-squid-pink text-squid-pink hover:bg-squid-pink hover:text-white"
                  data-testid="instagram-task-btn"
                >
                  <div className="text-center">
                    <div className="font-medium">Share on Instagram</div>
                    <ExternalLink className="w-4 h-4 mx-auto mt-1" />
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Join