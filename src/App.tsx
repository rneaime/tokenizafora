import React, { Component, ReactNode, useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Garantia from './components/Garantia.js';
import Tokenizer from './components/Tokenizer.js';
import Veiculo from './components/Veiculo.js';
import Error from './components/Error.js';
import Login from './components/Login.js';
import CadastroGarantia from './components/CadastroGarantia.js';
import CadastroVeiculo from './components/CadastroVeiculo.js';
import CadastroTokenizer from './components/CadastroTokenizer.js';
import { useAuth } from './hooks/useAuth.js';
import './App.css';

// Error boundary to catch errors in child components
class ErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Protected route component
interface ProtectedRouteProps {
  children: ReactNode;
  isAuthorized: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthorized }) => {
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App(): JSX.Element {
  const { autorizado, token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate checking auth state
    const checkAuthState = async () => {
      try {
        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 500));
      } finally {
        setIsLoading(false);
      }
    };    
    checkAuthState();
  }, [token]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Algo deu errado. Por favor, recarregue a página.</div>}> 
      <BrowserRouter>
        <Suspense fallback={<div>Carregando componente...</div>}>          
          <Routes>
            <Route path="/" element={<Navigate to="/garantias" replace />} />
            <Route 
              path="/garantias" 
              element={
                <ProtectedRoute isAuthorized={true}>
                  <Garantia />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tokenizar" 
              element={
                <ProtectedRoute isAuthorized={true}>
                  <Tokenizer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/veiculos" 
              element={
                <ProtectedRoute isAuthorized={true}>
                  <Veiculo />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
