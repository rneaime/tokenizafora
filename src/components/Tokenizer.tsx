import React, { useState } from 'react';

function Tokenizer() {
  const [renavam, setRenvam] = useState('');
  const [placa, setPlaca] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [valorDoVeiculo, setValorDoVeiculo] = useState('');

  const handleTokenizar = async () => {
    // L\u00f3gica de tokeniza\u00e7\u00e3o aqui
  };

  return (
    <div>
      <h2>Tokenizar Ve\u00edculo</h2>
      <form>
        <label>
          RENAVAM:
          <input type='text' value={renavam} onChange={(e) => setRenvam(e.target.value)} />
        </label>
        <label>
          Placa:
          <input type='text' value={placa} onChange={(e) => setPlaca(e.target.value)} />
        </label>
        <label>
          Propriet\u00e1rio:
          <input type='text' value={proprietario} onChange={(e) => setProprietario(e.target.value)} />
        </label>
        <label>
          Valor do Ve\u00edculo:
          <input type='number' value={valorDoVeiculo} onChange={(e) => setValorDoVeiculo(e.target.value)} />
        </label>
        <button onClick={handleTokenizar}>Tokenizar</button>
      </form>
    </div>
  );
}

export default Tokenizer;