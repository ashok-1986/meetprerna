'use client';

import React, { Component, ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4">
          <h2 className="text-h3 font-display mb-4 text-ivory">Something went wrong.</h2>
          <p className="text-body text-ivory-dim mb-8">We encountered an unexpected error loading this section.</p>
          <div className="flex gap-4">
            <Button onClick={() => this.setState({ hasError: false })} variant="secondary">
              Try again
            </Button>
            <Button asChild>
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
