import React, { useState, useEffect } from 'react';

function Garantia() {
  const [garantias, setGarantias] = useState([]);
  const [id, setId] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [valorDaGarantia, setValorDaGarantia] = useState('');
  const [statusDaGarantia, setStatusDaGarantia] = useState('');

  useEffect(() => {
    const carregarGarantias = async () => {
      const resposta = await fetch('http://localhost:3001/garantias');
      const dados = await resposta.json();
      setGarantias(dados);
    };
    carregarGarantias();
  }, []);

  const handleCriarGarantia = async () => {
    const criarGarantia = async () => {
      const resposta = await fetch('http://localhost:3001/garantias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          veiculo,
          proprietario,
          valorDaGarantia,
          statusDaGarantia
        })
      });
      const dados = await resposta.json();
      console.log(dados);
    };
    criarGarantia();
  };

  return (
    <div>
      <h2>Garantias</h2>
      <table>
        <thead>
          <tr>
            <th>ID da Garantia</th>
            <th>Veículo</th>
            <th>Proprietário</th>
            <th>Valor da Garantia</th>
            <th>Status da Garantia</th>
          </tr>
        </thead>
        <tbody>
          {garantias.map((garantia) => (
            <tr key={garantia.id}>
              <td>{garantia.id}</td>
              <td>{garantia.veiculo}</td>
              <td>{garantia.proprietario}</td>
              <td>{garantia.valorDaGarantia}</td>
              <td>{garantia.statusDaGarantia}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <label>
          ID da Garantia:
          <input type='text' value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <label>
          Veículo:
          <input type='text' value={veiculo} onChange={(e) => setVeiculo(e.target.value)} />
        </label>
        <label>
          Proprietário:
          <input type='text' value={proprietario} onChange={(e) => setProprietario(e.target.value)} />
        </label>
        <label>
          Valor da Garantia:
          <input type='number' value={valorDaGarantia} onChange={(e) => setValorDaGarantia(e.target.value)} />
        </label>
        <label>
          Status da Garantia:
          <input type='text' value={statusDaGarantia} onChange={(e) => setStatusDaGarantia(e.target.value)} />
        </label>
        <button onClick={handleCriarGarantia}>Criar Garantia</button>
      </form>
    </div>
  );
}

export default Garantia;