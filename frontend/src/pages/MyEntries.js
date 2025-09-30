import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Calendar, Hash, ExternalLink, Copy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import ConnectButton from '../components/ConnectButton'
import { formatAddress, copyToClipboard } from '../utils/ticket'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { toast } from 'sonner'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

const MyEntries = () => {
  const { t } = useTranslation()
  const { address, isConnected } = useAccount()
  const [registrationData, setRegistrationData] = useState(null)
  const [taskHistory, setTaskHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      loadUserData()
    }
  }, [isConnected, address])

  const loadUserData = async () => {
    setLoading(true)
    try {
      // Load registration data
      const regResponse = await axios.get(`${API}/registration/${address}`)
      if (regResponse.data.success) {
        setRegistrationData(regResponse.data.data)
      }

      // Load task history
      const taskResponse = await axios.get(`${API}/tasks/${address}`)
      if (taskResponse.data.success) {
        setTaskHistory(taskResponse.data.data)
      }
    } catch (error) {
      console.error('Failed to load user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyTicket = async () => {
    if (await copyToClipboard(registrationData.ticket)) {
      toast.success(t('messages.ticketCopied'))
    } else {
      toast.error(t('messages.ticketCopyFailed'))
    }
  }

  const handleCopyTxHash = async () => {
    if (await copyToClipboard(registrationData.txHash)) {
      toast.success(t('messages.txHashCopied'))
    } else {
      toast.error(t('messages.ticketCopyFailed'))
    }
  }

  const openBscScan = () => {
    window.open(`https://bscscan.com/tx/${registrationData.txHash}`, '_blank')
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">{t('myEntries.title')}</h1>
          <Card className="bg-black/50 border-squid-grey/20 backdrop-blur-xl">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-squid-grey/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-squid-grey text-3xl">👛</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{t('myEntries.connectRequired')}</h3>
                <p className="text-squid-grey mb-6">{t('myEntries.connectDesc')}</p>
                <ConnectButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{t('myEntries.title')}</h1>
          <p className="text-squid-grey text-lg">
            {t('myEntries.subtitle')}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-squid-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-squid-grey">{t('myEntries.loadingData')}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Registration Card */}
            <Card className="bg-black/50 border-squid-grey/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Hash className="w-5 h-5" />
                  <span>{t('myEntries.lotteryRegistration')}</span>
                </CardTitle>
                <CardDescription className="text-squid-grey">
                  {t('myEntries.registrationDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {registrationData ? (
                  <div className="space-y-6">
                    {/* Ticket Display */}
                    <div className="bg-gradient-to-br from-squid-pink/10 to-squid-purple/10 border border-squid-pink/30 rounded-2xl p-6 text-center">
                      <div className="text-sm text-squid-grey mb-2">{t('myEntries.yourLotteryTicket')}</div>
                      <div className="text-3xl font-bold text-white mb-4 font-mono">{registrationData.ticket}</div>
                      <Button
                        onClick={handleCopyTicket}
                        variant="outline"
                        size="sm"
                        className="border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-squid-dark"
                        data-testid="copy-ticket-btn"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {t('myEntries.copyTicket')}
                      </Button>
                    </div>

                    {/* Registration Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-squid-grey mb-1">{t('myEntries.entryIndex')}</div>
                          <div className="text-white font-medium">#{registrationData.index}</div>
                        </div>
                        <div>
                          <div className="text-sm text-squid-grey mb-1">{t('myEntries.payuReceived')}</div>
                          <div className="text-squid-teal font-medium">250,000,000 PAYU</div>
                        </div>
                        <div>
                          <div className="text-sm text-squid-grey mb-1">{t('myEntries.registrationDate')}</div>
                          <div className="text-white font-medium">
                            {new Date(registrationData.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-squid-grey mb-1">Transaction Hash</div>
                          <div className="flex items-center space-x-2">
                            <code className="text-white text-sm bg-squid-dark/50 px-2 py-1 rounded">
                              {formatAddress(registrationData.txHash)}
                            </code>
                            <Button
                              onClick={handleCopyTxHash}
                              variant="ghost"
                              size="sm"
                              className="p-1 h-auto"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={openBscScan}
                              variant="ghost"
                              size="sm"
                              className="p-1 h-auto"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-squid-grey mb-1">Wallet Address</div>
                          <div className="text-white font-medium font-mono">{formatAddress(address)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-squid-grey mb-1">Status</div>
                          <Badge className="bg-squid-success/20 text-squid-success border-squid-success/30">
                            Registered
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-squid-grey/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-squid-grey text-3xl">🎫</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">No Registration Found</h3>
                    <p className="text-squid-grey mb-6">You haven't registered for the lottery yet.</p>
                    <Button
                      onClick={() => window.location.href = '/join'}
                      className="bg-gradient-to-r from-squid-pink to-squid-purple hover:from-squid-pink/80 hover:to-squid-purple/80 text-white"
                    >
                      Join the Draw
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Task History */}
            <Card className="bg-black/50 border-squid-grey/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Task History</span>
                </CardTitle>
                <CardDescription className="text-squid-grey">
                  Your completed bonus tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                {taskHistory.length > 0 ? (
                  <div className="space-y-4">
                    {taskHistory.map((task, index) => (
                      <div key={index} className="flex items-center justify-between py-3 px-4 bg-squid-dark/30 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-squid-success rounded-full"></div>
                          <div>
                            <div className="text-white font-medium capitalize">
                              {task.platform === 'instagram_story' ? 'Instagram Story' : task.platform}
                            </div>
                            {task.handle && (
                              <div className="text-sm text-squid-grey">@{task.handle}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-squid-grey">
                          {new Date(task.clickedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-squid-grey/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-squid-grey text-3xl">📋</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">No Tasks Completed</h3>
                    <p className="text-squid-grey mb-6">Complete bonus tasks to increase your chances of winning.</p>
                    <Button
                      onClick={() => window.location.href = '/join'}
                      variant="outline"
                      className="border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-squid-dark"
                    >
                      View Tasks
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyEntries