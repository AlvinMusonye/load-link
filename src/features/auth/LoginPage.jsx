import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Truck, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    clearError()

    if (!email.trim()) {
      setLocalError('Email address is required.')
      return
    }
    if (!password) {
      setLocalError('Password is required.')
      return
    }

    try {
      const result = await login(email.trim(), password)
      if (result?.success) {
        navigate('/app')
      }
    } catch (err) {
      // error is already set in the store
    }
  }

  const displayError = localError || error

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#EFF6FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          width: '100%',
          maxWidth: '26rem',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            marginBottom: '1.75rem',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.625rem',
              backgroundColor: '#1D4ED8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Truck style={{ width: '1.25rem', height: '1.25rem', color: '#fff' }} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F2A4A' }}>LoadLink</span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#0F2A4A',
            textAlign: 'center',
            marginBottom: '0.375rem',
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#6B7280',
            textAlign: 'center',
            marginBottom: '1.75rem',
          }}
        >
          Sign in to your LoadLink account
        </p>

        {/* Error alert */}
        {displayError && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            <AlertCircle
              style={{ width: '1rem', height: '1rem', color: '#B91C1C', flexShrink: 0, marginTop: '0.05rem' }}
            />
            <p style={{ fontSize: '0.8rem', color: '#B91C1C', margin: 0 }}>{displayError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#0F2A4A',
                marginBottom: '0.375rem',
              }}
            >
              Email address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1rem',
                  height: '1rem',
                  color: '#6B7280',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.co.ke"
                style={{
                  width: '100%',
                  paddingLeft: '2.375rem',
                  paddingRight: '0.75rem',
                  paddingTop: '0.5625rem',
                  paddingBottom: '0.5625rem',
                  border: '1px solid rgba(191,219,254,0.7)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#0F2A4A',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1D4ED8'
                  e.target.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.12)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(191,219,254,0.7)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#0F2A4A',
                marginBottom: '0.375rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1rem',
                  height: '1rem',
                  color: '#6B7280',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  paddingLeft: '2.375rem',
                  paddingRight: '0.75rem',
                  paddingTop: '0.5625rem',
                  paddingBottom: '0.5625rem',
                  border: '1px solid rgba(191,219,254,0.7)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#0F2A4A',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1D4ED8'
                  e.target.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.12)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(191,219,254,0.7)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.6875rem 1.25rem',
              backgroundColor: isLoading ? '#93C5FD' : '#1D4ED8',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.9375rem',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              marginTop: '0.25rem',
              transition: 'background-color 0.15s',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin 0.75s linear infinite' }} />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Footer link */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: '#6B7280',
            marginTop: '1.5rem',
          }}
        >
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            style={{
              color: '#1D4ED8',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Create one
          </Link>
        </p>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default LoginPage
