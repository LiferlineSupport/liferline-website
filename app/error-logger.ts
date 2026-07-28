'use client'

export function logError(error: Error, errorInfo?: { componentStack?: string }) {
  // Log to console
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    timestamp: new Date().toISOString(),
  })

  // In production, you could send to an error tracking service like Sentry
  // For now, we'll just use console.error which should appear in Hostinger logs
}
