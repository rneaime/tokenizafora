import { useState, useEffect } from 'react';

const useAuth = () => {
  const [autorizado, setAutorizado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const verificarAutorizacao = async () => {
      const resposta = await fetch('http://localhost:3001/verificar-autorizacao');
      const dados = await resposta.json();
      setAutorizado(dados.autorizado);
      setUsuario(dados.usuario);
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
    setAutorizado(dados.autorizado);
    setUsuario(dados.usuario);
  };

  const logout = async () => {
    const resposta = await fetch('http://localhost:3001/logout');
    const dados = await resposta.json();
    setAutorizado(dados.autorizado);
    setUsuario(dados.usuario);
  };

  return { autorizado, usuario, login, logout };
};

export default useAuth;