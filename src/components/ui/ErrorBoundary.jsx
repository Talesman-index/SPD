import React from 'react'

/**
 * ErrorBoundary — wraps any section/component.
 * If a crash occurs, it shows a minimal fallback instead of blanking the entire page.
 * In dev mode it logs the error; in production it stays silent to users.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Always log for debugging — visible in browser DevTools console
    console.error(`[ErrorBoundary] Crash in <${this.props.name || 'Component'}>:`, error, info)
  }

  render() {
    if (this.state.hasError) {
      // In dev: show a visible warning banner
      if (import.meta.env.DEV) {
        return (
          <div style={{
            padding: '24px',
            margin: '8px 0',
            background: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '12px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#856404'
          }}>
            <strong>⚠️ Dev Error — Section "{this.props.name || 'Unknown'}" crashed:</strong>
            <br />
            <code>{this.state.error?.message}</code>
          </div>
        )
      }
      // In production: render nothing — section silently disappears, rest of page intact
      return null
    }
    return this.props.children
  }
}

export default ErrorBoundary
