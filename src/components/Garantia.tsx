import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { carregarGarantias as fetchGarantias, criarGarantia, Garantia as GarantiaType } from '../services/garantias.js';

function Garantia() {
  const [garantias, setGarantias] = useState<GarantiaType[]>([]);
  const [id, setId] = useState<string>('');
  const [veiculo, setVeiculo] = useState<string>('');
  const [proprietario, setProprietario] = useState<string>('');
  const [valorDaGarantia, setValorDaGarantia] = useState<string>('');
  const [statusDaGarantia, setStatusDaGarantia] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadGarantias = async () => {
      setLoading(true);
      setError(null);
      try {
        const resposta = await fetchGarantias();
        setGarantias(resposta);
      } catch (err) {
        setError('Erro ao carregar garantias. Por favor, tente novamente.');
        console.error('Erro ao carregar garantias:', err);
      } finally {
        setLoading(false);
      }
    };
    loadGarantias();
  }, []);

  const handleCriarGarantia = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate inputs
      if (!veiculo || !proprietario || !valorDaGarantia || !statusDaGarantia) {
        throw new Error('Todos os campos são obrigatórios');
      }
      
      const garantiaData = {
        veiculo,
        proprietario,
        valorDaGarantia: parseFloat(valorDaGarantia),
        statusDaGarantia
      };
      
      const resposta = await criarGarantia(garantiaData);
      setGarantias([...garantias, resposta]);
      setSuccess('Garantia criada com sucesso!');
      
      // Reset form
      setId('');
      setVeiculo('');
      setProprietario('');
      setValorDaGarantia('');
      setStatusDaGarantia('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar garantia. Por favor, tente novamente.';
      setError(errorMessage);
      console.error('Erro ao criar garantia:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Garantias</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      
      {loading && <p>Carregando...</p>}
      
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
              <td>{garantia.valorDaGarantia.toFixed(2)}</td>
              <td>{garantia.statusDaGarantia}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3>Criar Nova Garantia</h3>
      <form onSubmit={handleCriarGarantia}>
        <label>
          Veículo:
          <input 
            type='text' 
            value={veiculo} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setVeiculo(e.target.value)} 
            required
          />
        </label>
        <label>
          Proprietário:
          <input 
            type='text' 
            value={proprietario} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setProprietario(e.target.value)} 
            required
          />
        </label>
        <label>
          Valor da Garantia:
          <input 
            type='number' 
            value={valorDaGarantia} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValorDaGarantia(e.target.value)} 
            step="0.01"
            min="0"
            required
          />
        </label>
        <label>
          Status da Garantia:
          <input 
            type='text' 
            value={statusDaGarantia} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStatusDaGarantia(e.target.value)} 
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Criar Garantia'}
        </button>
      </form>
    </div>
  );
}

export default Garantia;
