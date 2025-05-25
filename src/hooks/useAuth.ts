import { useState, useEffect } from 'react';

const useAuth = () => {
  const [autorizado, setAutorizado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const verificarAutorizacao = async () => {
      const tokenStorage = localStorage.getItem('token');
      if (tokenStorage) {
        setToken(tokenStorage);
        const resposta = await fetch('http://localhost:3001/verificar-autorizacao', {
          headers: {
            'Authorization': `Bearer ${tokenStorage}`
          }
        });
        const dados = await resposta.json();
        setAutorizado(dados.autorizado);
        setUsuario(dados.usuario);
      }
    };
    verificarAutorizacao();
  }, []);

  const login = async (username: string, password: string) => {
    const resposta = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const dados = await resposta.json();
    if (dados.autorizado) {
      setToken(dados.token);
      setAutorizado(dados.autorizado);
      setUsuario(dados.usuario);
      localStorage.setItem('token', dados.token);
    }
  };

  const logout = async () => {
    const resposta = await fetch('http://localhost:3001/logout', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const dados = await resposta.json();
    setToken(null);
    setAutorizado(dados.autorizado);
    setUsuario(dados.usuario);
    localStorage.removeItem('token');
  };

  return { autorizado, usuario, token, login, logout };
};

export default useAuth;