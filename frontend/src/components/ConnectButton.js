import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { formatAddress } from '../utils/ticket'

const ConnectButton = ({ onConnect, className = '' }) => {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isLoading: isPending } = useConnect({
    onSuccess: () => {
      if (onConnect) onConnect()
    }
  })
  const { disconnect } = useDisconnect()

  const handleConnect = (connector) => {
    connect(connector)
  }

  const handleDisconnect = () => {
    disconnect()
  }

  if (isConnected) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="flex items-center space-x-2 px-3 py-2 bg-squid-dark/50 border border-squid-teal rounded-xl">
          <div className="w-2 h-2 bg-squid-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-squid-teal">{formatAddress(address)}</span>
        </div>
        <Button 
          onClick={handleDisconnect}
          variant="outline"
          size="sm"
          className="border-squid-grey text-squid-grey hover:border-squid-pink hover:text-squid-pink"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          onClick={() => handleConnect(connector)}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-squid-pink to-squid-purple hover:from-squid-pink/80 hover:to-squid-purple/80 text-white font-medium py-3 px-6 rounded-2xl shadow-glow transition-all duration-300 hover:shadow-glow active:scale-95"
          data-testid="connect-wallet-btn"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Wallet className="w-5 h-5 mr-2" />
          )}
          {isPending ? 'Connecting...' : `Connect ${connector.name}`}
        </Button>
      ))}
    </div>
  )
}

export default ConnectButton