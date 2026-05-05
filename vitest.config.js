// Load Link Vitest Configuration
// Testing setup for unit and integration tests

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  test: {
    // Test environment
    environment: 'jsdom',
    
    // Global test setup
    globals: true,
    
    // Test files
    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      'tests/**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
    
    // Exclude files
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
    ],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        'src/**/*.stories.{js,jsx,ts,tsx}',
        'src/**/*.config.{js,jsx,ts,tsx}',
        'src/main.jsx',
        '**/*.d.ts',
        '**/index.{js,jsx,ts,tsx}',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    
    // Test timeout
    testTimeout: 10000,
    
    // Hook timeout
    hookTimeout: 10000,
    
    // Setup files
    setupFiles: ['./src/test/setup.js'],
    
    // CSS handling
    css: true,
    
    // Module aliases
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@config': path.resolve(__dirname, './src/config'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
    },
    
    // Watch mode
    watch: false,
    
    // Reporter
    reporter: ['verbose'],
    
    // Threads
    threads: true,
    
    // Isolate tests
    isolate: true,
    
    // Bail on first failure
    bail: 0,
    
    // Retry failed tests
    retry: 2,
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@config': path.resolve(__dirname, './src/config'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
    },
  },
});
