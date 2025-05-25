import React, { useState, useEffect } from 'react';

function Veiculo() {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    // L√≥gica de carregar ve√≠culos aqui
  }, []);

  return (
    <div>
      <h2>Ve√≠culos</h2>
      <table>
        <thead>
          <tr>
            <th>RENAVAM</th>
            <th>Placa</th>
            <th>Propriet√°rio</th>
            <th>Valor do Ve√≠culo</th>
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