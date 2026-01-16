import { Component, type ReactNode } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Error as ErrorIcon, Refresh } from '@mui/icons-material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 * 
 * Usage: Wrap your app or sections of your app with <ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error for debugging
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  handleReload = () => {
    // Reload the page to reset the app state
    window.location.reload();
  };

  handleRetry = () => {
    // Reset the error state to try rendering again
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 3,
            p: 4,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          }}
        >
          <ErrorIcon sx={{ width: 64, height: 64, color: '#FF3D57' }} />
          
          <Typography variant="h5" sx={{ color: '#FF3D57', fontWeight: 600 }}>
            Something went wrong
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#94a3b8', 
              textAlign: 'center',
              maxWidth: 400,
            }}
          >
            An unexpected error occurred. You can try again or reload the page.
          </Typography>

          {this.state.error && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 1,
                backgroundColor: 'rgba(255, 61, 87, 0.1)',
                border: '1px solid rgba(255, 61, 87, 0.3)',
                maxWidth: 500,
                width: '100%',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#FF3D57',
                  fontFamily: 'monospace',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.message}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              onClick={this.handleRetry}
              sx={{
                color: '#94a3b8',
                borderColor: '#475569',
                '&:hover': {
                  borderColor: '#64748b',
                  backgroundColor: 'rgba(100, 116, 139, 0.1)',
                },
              }}
            >
              Try Again
            </Button>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={this.handleReload}
              sx={{
                backgroundColor: '#FF3D57',
                '&:hover': {
                  backgroundColor: '#e6364e',
                },
              }}
            >
              Reload Page
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
