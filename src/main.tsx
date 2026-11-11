import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App runtime caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0c0d1e] text-[#f7eef7] p-6 text-center">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full border border-pink-300/30 shadow-2xl">
            <span className="text-4xl block mb-3 animate-bounce">♡</span>
            <h1 className="font-display text-2xl text-pink-100 mb-2">A gentle pause...</h1>
            <p className="text-sm text-slate-300/80 mb-6 font-sans-soft leading-relaxed">
              Don&apos;t worry, my cute babyy. Let&apos;s reopen our little world softly.
            </p>
            <button
              onClick={this.handleReload}
              className="glass-button px-6 py-3 rounded-2xl text-pink-100 text-sm font-medium cursor-pointer"
            >
              Reopen our world ♡
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
