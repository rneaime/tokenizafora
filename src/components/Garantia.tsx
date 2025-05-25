import React, { useState, useEffect } from 'react';
import { carregarGarantias, criarGarantia } from '../services/garantias';

function Garantia() {
  const [garantias, setGarantias] = useState([]);
  const [id, setId] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [valorDaGarantia, setValorDaGarantia] = useState('');
  const [statusDaGarantia, setStatusDaGarantia] = useState('');

  useEffect(() => {
    const carregarGarantias = async () => {
      const resposta = await carregarGarantias();
      setGarantias(resposta);
    };
    carregarGarantias();
  }, []);

  const handleCriarGarantia = async () => {
    const garantia = { id, veiculo, proprietario, valorDaGarantia, statusDaGarantia };
    const resposta = await criarGarantia(garantia);
    console.log(resposta);
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