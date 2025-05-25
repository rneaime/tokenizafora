import axios from 'axios';

const veiculos = axios.create({
  baseURL: 'http://localhost:3001/veiculos'
});

export const carregarVeiculos = async () => {
  const resposta = await veiculos.get();
  return resposta.data;
};

export const criarVeiculo = async (veiculo: any) => {
  const resposta = await veiculos.post('', veiculo);
  return resposta.data;
};