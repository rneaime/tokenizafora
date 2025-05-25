import React, { useState } from 'react';

function Tokenizer() {
  const [renavam, setRenvam] = useState('');
  const [placa, setPlaca] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [valorDoVeiculo, setValorDoVeiculo] = useState('');

  const handleTokenizar = async () => {
    // L√≥gica de tokeniza√ß√£o aqui
  };

  return (
    <div>
      <h2>Tokenizar Ve√≠culo</h2>
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
          Propriet√°rio:
          <input type='text' value={proprietario} onChange={(e) => setProprietario(e.target.value)} />
        </label>
        <label>
          Valor do Ve√≠culo:
          <input type='number' value={valorDoVeiculo} onChange={(e) => setValorDoVeiculo(e.target.value)} />
        </label>
        <button onClick={handleTokenizar}>Tokenizar</button>
      </form>
    </div>
  );
}

export default Tokenizer;