import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { verificarCredenciais, cadastrarUsuario } from '../data/usuarios.js';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!username || !password) {
        throw new Error('Username e senha são obrigatórios');
      }
      if (verificarCredenciais(username, password)) {
        const resposta = await login(username, password);
        if (resposta.autorizado) {
          navigate('/');
        } else {
          throw new Error('Credenciais inválidas');
        }
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar login';
      setError(errorMessage);
      console.error('Erro ao realizar login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!username || !password) {
        throw new Error('Username e senha são obrigatórios');
      }
      cadastrarUsuario({ username, password });
      setSuccess('Cadastro realizado com sucesso');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar cadastro';
      setError(errorMessage);
      console.error('Erro ao realizar cadastro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Entrar no Login</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      {loading && <p>Processando...</p>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type='text' value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} required disabled={loading} />
        </label>
        <label>
          Password:
          <input type='password' value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required disabled={loading} />
        </label>
        <button type='submit' disabled={loading}>{loading ? 'Processando...' : 'Fazer Login'}</button>
      </form>
      <button onClick={handleCadastro}>{loading ? 'Processando...' : 'Cadastrar'}</button>
    </div>
  );
}

export default Login;
