import React, { useState, useEffect } from 'react';

function Veiculo() {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    // Lógica de carregar veículos aqui
    const carregarVeiculos = async () => {
      const resposta = await fetch('https://api.tokenizafora.com/veiculos');
      const dados = await resposta.json();
      setVeiculos(dados);
    };
    carregarVeiculos();
  }, []);

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
    </div>
  );
}

export default Veiculo;