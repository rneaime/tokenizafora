import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Garantia from './components/Garantia';
import Tokenizer from './components/Tokenizer';
import Veiculo from './components/Veiculo';
import Error from './components/Error';
import Login from './components/Login';
import { useAuth } from './hooks/useAuth';

function App() {
  const { autorizado } = useAuth();

  return (
    <BrowserRouter>
      {autorizado ? (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/garantias">Garantias</Link>
              </li>
              <li>
                <Link to="/tokenizar">Tokenizar</Link>
              </li>
              <li>
                <Link to="/veiculos">Veículos</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/garantias" element={<Garantia />} />
            <Route path="/tokenizar" element={<Tokenizer />} />
            <Route path="/veiculos" element={<Veiculo />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
}

export default App;