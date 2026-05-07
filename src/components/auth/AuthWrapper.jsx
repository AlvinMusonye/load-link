// Load Link Authentication Wrapper Component
// Handles login/register switching and authentication flow

import React, { useState, useEffect } from 'react';
import LoginPage from '../../features/auth/LoginPage';
import RegisterForm from './RegisterForm';
import { useAuthStore } from '../../stores/authStore';

const AuthWrapper = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'forgot-password'
  const { initialize, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Initialize auth state on component mount
    initialize();
  }, [initialize]);

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password flow
    console.log('Forgot password flow to be implemented');
  };

  // If user is already authenticated, don't show auth forms
  // This will be handled by the main App component with routing
  if (isAuthenticated) {
    return null;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'register':
        return (
          <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        );
      case 'forgot-password':
        // TODO: Implement forgot password component
        return (
          <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
              <p className="mt-2 text-gray-600">This feature is coming soon</p>
              <button
                onClick={handleSwitchToLogin}
                className="mt-4 text-blue-600 hover:text-blue-500"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
      default:
        return <LoginPage />;
    }
  };

  return renderCurrentView();
};

export default AuthWrapper;
