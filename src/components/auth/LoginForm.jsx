// Load Link Login Form Component

import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Input, Button, Card, CardHeader, CardBody } from '../ui';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginForm = ({ onSwitchToRegister, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoading, error, clearError, requires2FA, tempToken, login2FA } = useAuthStore();
  const [totpCode, setTotpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (requires2FA) {
      // Handle 2FA submission
      if (!totpCode || totpCode.length !== 6) {
        return;
      }
      
      setIsSubmitting(true);
      try {
        await login2FA(totpCode);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Handle normal login
    if (!formData.email || !formData.password) {
      return;
    }

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handle2FACancel = () => {
    useAuthStore.getState().reset2FAState();
    setTotpCode('');
  };

  if (requires2FA) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter the 6-digit code from your authenticator app
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="totp_code" className="block text-sm font-medium text-gray-700 mb-2">
                  Authentication Code
                </label>
                <Input
                  id="totp_code"
                  name="totp_code"
                  type="text"
                  value={totpCode}
                  onChange={(e) => {
                    // Only allow numbers and max 6 digits
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setTotpCode(value);
                    if (error) clearError();
                  }}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting || totpCode.length !== 6}
                >
                  {isSubmitting ? 'Verifying...' : 'Verify'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handle2FACancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <div className="text-2xl font-bold text-blue-600">LL</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign in to Load Link</h2>
          <p className="mt-2 text-sm text-gray-600">
            East African Logistics Platform
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="pl-10"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500"
                onClick={onForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !formData.email || !formData.password}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={onSwitchToRegister}
                >
                  Sign up
                </button>
              </span>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
