function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          border: '3px solid #BFDBFE',
          borderTopColor: '#1D4ED8',
          animation: 'spin 0.75s linear infinite',
        }}
      />
      <p style={{ color: '#6B7280', fontSize: '0.875rem', fontFamily: 'inherit' }}>
        Loading...
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner
