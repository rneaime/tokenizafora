import express, { Request, Response } from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

// Rotas para garantias
app.get('/garantias', (req: Request, res: Response) => {
  // Lógica para carregar garantias aqui
  const garantias = [
    { id: 1, veiculo: 'Veículo 1', proprietario: 'Proprietário 1', valorDaGarantia: 1000, statusDaGarantia: 'Ativa' },
    { id: 2, veiculo: 'Veículo 2', proprietario: 'Proprietário 2', valorDaGarantia: 2000, statusDaGarantia: 'Inativa' },
  ];
  res.json(garantias);
});

app.post('/garantias', (req: Request, res: Response) => {
  // Lógica para criar garantia aqui
  const { id, veiculo, proprietario, valorDaGarantia, statusDaGarantia } = req.body;
  const garantia = { id, veiculo, proprietario, valorDaGarantia, statusDaGarantia };
  console.log(garantia);
  res.json(garantia);
});

// Rotas para tokenização
app.post('/tokenizar', (req: Request, res: Response) => {
  // Lógica para tokenizar veículo aqui
  const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
  const tokenizado = { renavam, placa, proprietario, valorDoVeiculo };
  res.json(tokenizado);
});

// Rotas para veículos
app.get('/veiculos', (req: Request, res: Response) => {
  // Lógica para carregar veículos aqui
  const veiculos = [
    { renavam: '1234567890', placa: 'ABC1234', proprietario: 'Proprietário 1', valorDoVeiculo: 10000 },
    { renavam: '2345678901', placa: 'DEF5678', proprietario: 'Proprietário 2', valorDoVeiculo: 20000 },
  ];
  res.json(veiculos);
});

app.post('/veiculos', (req: Request, res: Response) => {
  // Lógica para criar veículo aqui
  const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
  const veiculo = { renavam, placa, proprietario, valorDoVeiculo };
  console.log(veiculo);
  res.json(veiculo);
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});