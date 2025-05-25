import React, { useState } from 'react';

interface TokenizerProps {
  renavam: string;
  placa: string;
  proprietario: string;
  valorDoVeiculo: number;
}

const Tokenizer: React.FC<TokenizerProps> = ({ renavam, placa, proprietario, valorDoVeiculo }) => {
  const [token, setToken] = useState('');

  const handleTokenizar = async () => {
    // Lógica de tokenização aqui
    const tokenGerado = await tokenizarVeiculo(renavam, placa, proprietario, valorDoVeiculo);
    setToken(tokenGerado);
  };

  return (
    <div>
      <button onClick={handleTokenizar}>Tokenizar</button>
      <p>Token: {token}</p>
    </div>
  );
};

export default Tokenizer;