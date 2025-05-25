import React, { useState, useEffect } from 'react';

function Garantia() {
  const [garantias, setGarantias] = useState([]);

  useEffect(() => {
    // L√≥gica de carregar garantias aqui
  }, []);

  return (
    <div>
      <h2>Garantias</h2>
      <table>
        <thead>
          <tr>
            <th>ID da Garantia</th>
            <th>Ve√≠culo</th>
            <th>Propriet√°rio</th>
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
    </div>
  );
}

export default Garantia;