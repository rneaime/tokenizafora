import React, { useState, useEffect } from 'react';
import { carregarVeiculos, criarVeiculo } from '../services/veiculos';

function Veiculo() {
  const [veiculos, setVeiculos] = useState([]);
  const [renavam, setRenvam] = useState('');
  const [placa, setPlaca] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [valorDoVeiculo, setValorDoVeiculo] = useState('');

  useEffect(() => {
    const carregarVeiculos = async () => {
      const resposta = await carregarVeiculos();
      setVeiculos(resposta);
    };
    carregarVeiculos();
  }, []);

  const handleCriarVeiculo = async () => {
    const veiculo = { renavam, placa, proprietario, valorDoVeiculo };
    const resposta = await criarVeiculo(veiculo);
    console.log(resposta);
  };

  return (
    <div>
      <h2>Veículos</h2>
      <table>
        <thead>
          <tr>
            <th>RENAVAM</th>
            <th>Placa</th>
            <th>Proprietário</th>
            <th>Valor do Veículo</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.renavam}>
              <td>{veiculo.renavam}</td>
              <td>{veiculo.placa}</td>
              <td>{veiculo.proprietario}</td>
              <td>{veiculo.valorDoVeiculo}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
        <button onClick={handleCriarVeiculo}>Criar Veículo</button>
      </form>
    </div>
  );
}

export default Veiculo;