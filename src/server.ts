import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'vite';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define public directory path properly for ES modules
const publicPath = path.join(__dirname, '../public');
const distPath = path.join(__dirname, '../dist');
app.use(express.static(publicPath));
app.use(express.static(distPath));

// Desativa o cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  next();
});

// Middleware de autenticação
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

app.post('/garantias', autenticar, (req: Request, res: Response) => {
  // Lógica para criar garantia aqui
  const { id, veiculo, proprietario, valorDaGarantia, statusDaGarantia } = req.body;
  const garantia = { id, veiculo, proprietario, valorDaGarantia, statusDaGarantia };
  console.log(garantia);
  res.json(garantia);
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

app.post('/veiculos', autenticar, (req: Request, res: Response) => {
  // Lógica para criar veículo aqui
  const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
  const veiculo = { renavam, placa, proprietario, valorDoVeiculo };
  console.log(veiculo);
  res.json(veiculo);
});

// Rotas para autorização
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Lógica para autenticar o usuário aqui
  const usuario = { username, password };
  const token = jsonwebtoken.sign(usuario, 'chave_secreta', { expiresIn: '1h' });
  res.json({ autorizado: true, token, usuario });
});

app.get('/verificar-autorizacao', (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (token) {
    jsonwebtoken.verify(token, 'chave_secreta', (err, decoded) => {
      if (err) {
        res.status(401).json({ mensagem: 'Acesso não autorizado' });
      } else {
        res.json({ autorizado: true, usuario: decoded });
      }
    });
  } else {
    res.status(401).json({ mensagem: 'Acesso não autorizado' });
  }
});
// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo ao servidor!');
});

// Main route
app.get('/main', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Catch-all route must be last
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Initialize Vite development server
const vite = await createServer({
  root: path.join(__dirname, '..'),
  server: { 
    port: 3001,
    middlewareMode: true
  }
});

// Use Vite's middleware in development mode
app.use(vite.middlewares);

// Start Express server
app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});
