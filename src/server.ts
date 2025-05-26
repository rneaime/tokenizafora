import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

const autenticar = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization;
  if (token) {
    jsonwebtoken.verify(token, 'chave_secreta', (err, decoded) => {
      if (err) {
        res.status(401).json({ mensagem: 'Acesso não autorizado' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ mensagem: 'Acesso não autorizado' });
  }
};

// Rotas para garantias
app.get('/garantias', autenticar, (req: Request, res: Response) => {
  // Lógica para carregar garantias aqui
  const garantias = [
    { id: 1, veiculo: 'Veículo 1', proprietario: 'Proprietário 1', valorDaGarantia: 1000, statusDaGarantia: 'Ativa' },
    { id: 2, veiculo: 'Veículo 2', proprietario: 'Proprietário 2', valorDaGarantia: 2000, statusDaGarantia: 'Inativa' },
  ];
  res.json(garantias);
});

// Rotas para tokenização
app.post('/tokenizar', autenticar, (req: Request, res: Response) => {
  // Lógica para tokenizar veículo aqui
  const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
  const tokenizado = { renavam, placa, proprietario, valorDoVeiculo };
  res.json(tokenizado);
});

// Rotas para veículos
app.get('/veiculos', autenticar, (req: Request, res: Response) => {
  // Lógica para carregar veículos aqui
  const veiculos = [
    { renavam: '1234567890', placa: 'ABC1234', proprietario: 'Proprietário 1', valorDoVeiculo: 10000 },
    { renavam: '2345678901', placa: 'DEF5678', proprietario: 'Proprietário 2', valorDoVeiculo: 20000 },
  ];
  res.json(veiculos);
});

// Rotas para autorização
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Lógica para autenticar o usuário aqui
  const usuario = { username, password };
  const token = jsonwebtoken.sign(usuario, 'chave_secreta', { expiresIn: '1h' });
  res.json({ autorizado: true, token, usuario });
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
