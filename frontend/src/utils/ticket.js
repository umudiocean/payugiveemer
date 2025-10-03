// Utility functions for ticket generation and formatting

/**
 * Generate deterministic ticket from seed and index
 * @param {string} seed - Hex string from contract event
 * @param {number} index - User index from contract
 * @returns {string} - Formatted ticket string
 */
export function generateTicket(seed, index) {
  // Convert seed to BigInt and generate 7-digit number
  const seedBigInt = BigInt(seed)
  const ticketNumber = Number(seedBigInt % BigInt(10_000_000))
  
  // Pad with zeros to ensure 7 digits
  const paddedNumber = ticketNumber.toString().padStart(7, '0')
  
  return `PayuApp${paddedNumber}`
}

/**
 * Format wallet address for display
 * @param {string} address - Full wallet address
 * @returns {string} - Shortened address format
 */
export function formatAddress(address) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Format BNB amount for display
 * @param {string} wei - Amount in wei
 * @returns {string} - Formatted BNB amount
 */
export function formatBNB(wei) {
  const bnb = Number(wei) / 1e18
  return bnb.toFixed(5)
}

/**
 * Format PAYU tokens for display
 * @param {string} wei - Amount in wei (18 decimals)
 * @returns {string} - Formatted token amount
 */
export function formatTokens(wei) {
  const tokens = Number(wei) / 1e18
  return tokens.toLocaleString()
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}

/**
 * Format countdown time
 * @param {number} timeLeft - Time left in milliseconds
 * @returns {object} - Formatted time object
 */
export function formatCountdown(timeLeft) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
}