import axios from 'axios';

const garantias = axios.create({
  baseURL: 'http://localhost:3001/garantias'
});

export const carregarGarantias = async () => {
  const resposta = await garantias.get();
  return resposta.data;
};

export const criarGarantia = async (garantia: any) => {
  const resposta = await garantias.post('', garantia);
  return resposta.data;
};