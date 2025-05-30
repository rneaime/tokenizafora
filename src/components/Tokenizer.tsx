import React, { useState } from 'react';

function Tokenizer() {
  const [renavam, setRenvam] = useState('');
  const [placa, setPlaca] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [valorDoVeiculo, setValorDoVeiculo] = useState('');

  const handleTokenizar = async () => {
    const tokenizarVeiculo = async () => {
      const resposta = await fetch('http://localhost:3001/tokenizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          renavam,
          placa,
          proprietario,
          valorDoVeiculo
        })
      });
      const dados = await resposta.json();
      console.log(dados);
    };
    tokenizarVeiculo();
  };

  return (
    <div>
      <h2>Tokenizar Veículo</h2>
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
          Proprietário:
          <input type='text' value={proprietario} onChange={(e) => setProprietario(e.target.value)} />
        </label>
        <label>
          Valor do Veículo:
          <input type='number' value={valorDoVeiculo} onChange={(e) => setValorDoVeiculo(e.target.value)} />
        </label>
        <button onClick={handleTokenizar}>Tokenizar</button>
      </form>
    </div>
  );
}

export default Tokenizer;