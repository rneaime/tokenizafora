import React, { useState, useEffect } from 'react';

function Veiculo() {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    // L\u00f3gica de carregar ve\u00edculos aqui
  }, []);

  return (
    <div>
      <h2>Ve\u00edculos</h2>
      <table>
        <thead>
          <tr>
            <th>RENAVAM</th>
            <th>Placa</th>
            <th>Propriet\u00e1rio</th>
            <th>Valor do Ve\u00edculo</th>
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