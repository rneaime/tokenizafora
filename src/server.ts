
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'vite';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Configure body-parser with size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// Define public directory path properly for ES modules
const publicPath = path.join(__dirname, '../public');
const distPath = path.join(__dirname, '../dist');

// Serve static files with proper content types
app.use(express.static(distPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));
app.use(express.static(publicPath));


// Desativa o cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  next();
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

// Middleware de autenticação
const autenticar = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'chave_secreta', (err, decoded) => {
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
  const token = jwt.sign(usuario, 'chave_secreta', { expiresIn: '1h' });
  res.json({ autorizado: true, token, usuario });
});

app.get('/verificar-autorizacao', (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'chave_secreta', (err, decoded) => {
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

app.post('/logout', (req: Request, res: Response) => {
  // Lógica para desautenticar o usuário aqui
  res.json({ autorizado: false });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo ao servidor!');
});

// Main route
app.get('/main', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Generic dist file handling with params - this will handle all dist files including main.js
app.get('/dist/:file', (req, res) => {
  const file = req.params.file;
  if (file.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  res.sendFile(path.join(__dirname, '../dist/' + file));
});

// Generic dist file handling with wildcard for nested paths
app.get('/dist/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist', req.params[0]));
});

// 404 middleware - capture API routes that don't match
app.use('/api', (req, res, next) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

// Catch-all route must be last - after 404 middleware
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start Express server
app.listen(3001, () => {
  console.log('Servidor está rodando na porta 3001');
});
