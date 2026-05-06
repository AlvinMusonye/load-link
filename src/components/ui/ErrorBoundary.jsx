import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#EFF6FF',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(191,219,254,0.45)',
              borderRadius: '1rem',
              padding: '2.5rem',
              maxWidth: '36rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                marginBottom: '1.25rem',
              }}
            >
              <AlertTriangle style={{ width: '2rem', height: '2rem', color: '#B91C1C' }} />
            </div>

            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#0F2A4A',
                marginBottom: '0.5rem',
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                fontSize: '0.875rem',
                color: '#374151',
                marginBottom: '1.5rem',
              }}
            >
              An unexpected error occurred in the application. The issue has been logged.
            </p>

            {this.state.error && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    color: '#B91C1C',
                    wordBreak: 'break-word',
                    margin: 0,
                  }}
                >
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details style={{ marginTop: '0.5rem' }}>
                    <summary
                      style={{
                        fontSize: '0.75rem',
                        color: '#6B7280',
                        cursor: 'pointer',
                      }}
                    >
                      Component stack
                    </summary>
                    <pre
                      style={{
                        fontSize: '0.7rem',
                        color: '#6B7280',
                        marginTop: '0.5rem',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <button
              onClick={this.handleReload}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#1D4ED8',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <RefreshCw style={{ width: '1rem', height: '1rem' }} />
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
