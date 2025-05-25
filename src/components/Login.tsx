import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleLogin = async () => {
    // Lógica para autenticar o usuário aqui
    const resposta = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const dados = await resposta.json();
    if (dados.autorizado) {
      navigate('/');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
}

export default Login;