import axios from 'axios';

// Define interface for Veiculo
export interface Veiculo {
  renavam: string;
  placa: string;
  proprietario: string;
  valorDoVeiculo: number;
}

// Define os endpoints para veículos
const veiculos = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export async function carregarVeiculos(): Promise<Veiculo[]> {
  try {
    const resposta = await veiculos.get('/veiculos');
    return resposta.data;
  } catch (error) {
    console.error('Erro ao carregar veículos:', error);
    return [];
  }
}

export async function criarVeiculo(veiculo: Veiculo): Promise<Veiculo> {
  try {
    const resposta = await veiculos.post('/veiculos', veiculo);
    return resposta.data;
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    throw error;
  }
}
