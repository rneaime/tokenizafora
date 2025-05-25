import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Garantia from './components/Garantia';
import Tokenizer from './components/Tokenizer';
import Veiculo from './components/Veiculo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/garantias" element={<Garantia />} />
        <Route path="/tokenizar" element={<Tokenizer />} />
        <Route path="/veiculos" element={<Veiculo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;