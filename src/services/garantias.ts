import axios from 'axios';

// Define interface for Garantia
export interface Garantia {
  id: number;
  veiculo: string;
  proprietario: string;
  valorDaGarantia: number;
  statusDaGarantia: string;
}

// Define os endpoints para garantias
const garantias = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export async function carregarGarantias(): Promise<Garantia[]> {
  try {
    const resposta = await garantias.get('/garantias');
    return resposta.data;
  } catch (error) {
    console.error('Erro ao carregar garantias:', error);
    return [];
  }
}

export async function criarGarantia(garantia: Omit<Garantia, 'id'>): Promise<Garantia> {
  try {
    const resposta = await garantias.post('/garantias', garantia);
    return resposta.data;
  } catch (error) {
    console.error('Erro ao criar garantia:', error);
    throw error;
  }
}
