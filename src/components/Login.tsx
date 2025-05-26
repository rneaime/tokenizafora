import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate inputs
      if (!username || !password) {
        throw new Error('Username e senha são obrigatórios');
      }
      
      const loginSuccessful = await login(username, password);
      
      if (loginSuccessful) {
        setSuccess('Login realizado com sucesso');
        navigate('/');
      } else {
        setError('Usuário ou senha inválidos');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar login. Por favor, tente novamente.';
      setError(errorMessage);
      console.error('Erro ao realizar login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await logout();
      setSuccess('Logout realizado com sucesso');
      navigate('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar logout. Por favor, tente novamente.';
      setError(errorMessage);
      console.error('Erro ao realizar logout:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      
      {loading && <p>Processando...</p>}
      
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input 
            type='text' 
            value={username} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} 
            required
            disabled={loading}
          />
        </label>
        <label>
          Password:
          <input 
            type='password' 
            value={password} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
            required
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Login'}
        </button>
        <button type="button" onClick={handleLogout} disabled={loading}>
          Logout
        </button>
      </form>
    </div>
  );
}

export default Login;
