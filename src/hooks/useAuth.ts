import { useState, useEffect } from 'react';
import axios from 'axios';

// User interface
interface User {
  username: string;
  password?: string;
  [key: string]: any;
}

// Authentication response interface
interface AuthResponse {
  autorizado: boolean;
  token?: string;
  usuario?: User;
  mensagem?: string;
}

// Auth hook return type
interface AuthHook {
  autorizado: boolean;
  usuario: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

// Consistent token storage key
const TOKEN_STORAGE_KEY = 'tokenizaforaToken';

// API base URL
const API_BASE_URL = 'http://localhost:3001/api';

export const useAuth = (): AuthHook => {
  const [autorizado, setAutorizado] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se já existe um token no local storage
    const tokenStorage = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (tokenStorage) {
      setToken(tokenStorage);
      verificarAutorizacao(tokenStorage);
    }
  }, []);

  const verificarAutorizacao = async (currentToken: string): Promise<void> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/verificar-autorizacao`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      
      const dados = response.data;
      
      if (dados.autorizado) {
        setAutorizado(true);
        setUsuario(dados.usuario || null);
      } else {
        // Token inválido ou expirado
        limparAutenticacao();
      }
    } catch (error) {
      console.error('Erro ao verificar autorização:', error);
      limparAutenticacao();
    }
  };

  const limparAutenticacao = (): void => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setAutorizado(false);
    setUsuario(null);
  };

  const login = async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      const dados: AuthResponse = response.data;
      
      if (dados.autorizado && dados.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, dados.token);
        setToken(dados.token);
        setAutorizado(true);
        setUsuario(dados.usuario || null);
      }
      
      return dados;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (token) {
        await axios.post(`${API_BASE_URL}/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Mesmo com erro, limpa dados locais
      limparAutenticacao();
    }
  };

  return { autorizado, usuario, token, login, logout };
};
