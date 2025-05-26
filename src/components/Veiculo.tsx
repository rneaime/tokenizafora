import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { carregarVeiculos as fetchVeiculos, criarVeiculo, Veiculo as VeiculoType } from '../services/veiculos.js';

function Veiculo() {
  const [veiculos, setVeiculos] = useState<VeiculoType[]>([]);
  const [renavam, setRenavam] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  const [proprietario, setProprietario] = useState<string>('');
  const [valorDoVeiculo, setValorDoVeiculo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadVeiculos = async () => {
      setLoading(true);
      setError(null);
      try {
        const resposta = await fetchVeiculos();
        setVeiculos(resposta);
      } catch (err) {
        setError('Erro ao carregar veículos. Por favor, tente novamente.');
        console.error('Erro ao carregar veículos:', err);
      } finally {
        setLoading(false);
      }
    };
    loadVeiculos();
  }, []);

  const handleCriarVeiculo = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate inputs
      if (!renavam || !placa || !proprietario || !valorDoVeiculo) {
        throw new Error('Todos os campos são obrigatórios');
      }
      
      const veiculoData: VeiculoType = {
        renavam,
        placa,
        proprietario,
        valorDoVeiculo: parseFloat(valorDoVeiculo)
      };
      
      const resposta = await criarVeiculo(veiculoData);
      setVeiculos([...veiculos, resposta]);
      setSuccess('Veículo criado com sucesso!');
      
      // Reset form
      setRenavam('');
      setPlaca('');
      setProprietario('');
      setValorDoVeiculo('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar veículo. Por favor, tente novamente.';
      setError(errorMessage);
      console.error('Erro ao criar veículo:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Veículos</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      
      {loading && <p>Carregando...</p>}
      
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
              <td>{veiculo.valorDoVeiculo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3>Criar Novo Veículo</h3>
      <form onSubmit={handleCriarVeiculo}>
        <label>
          RENAVAM:
          <input 
            type='text' 
            value={renavam} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRenavam(e.target.value)} 
            required
          />
        </label>
        <label>
          Placa:
          <input 
            type='text' 
            value={placa} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPlaca(e.target.value)} 
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
          Valor do Veículo:
          <input 
            type='number' 
            value={valorDoVeiculo} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValorDoVeiculo(e.target.value)} 
            step="0.01"
            min="0"
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Criar Veículo'}
        </button>
      </form>
    </div>
  );
}

export default Veiculo;
