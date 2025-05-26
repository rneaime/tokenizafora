import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// Type definitions for better type checking
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start Vite in middleware mode for frontend development
const vite = await createServer({
  root: path.join(__dirname, '..'),
  server: { 
    port: 3000, // Frontend on port 3000
    strictPort: true,
    middlewareMode: true
  }
});

// Create Express app for the backend API
const app = express();
const PORT = 3001; // Backend on port 3001

// Configure middleware
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

// General middleware for content type
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Disable cache
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  next();
});

// API endpoint for frontend health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authentication middleware
const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'chave_secreta', (err: any, decoded: any) => {
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

// Routes for garantias (with /api prefix)
app.get('/api/garantias', autenticar, (req: Request, res: Response) => {
  // Logic for loading garantias
  const garantias = [
    { id: 1, veiculo: 'Veículo 1', proprietario: 'Proprietário 1', valorDaGarantia: 1000, statusDaGarantia: 'Ativa' },
    { id: 2, veiculo: 'Veículo 2', proprietario: 'Proprietário 2', valorDaGarantia: 2000, statusDaGarantia: 'Inativa' },
  ];
  res.json(garantias);
});

// Routes for tokenization (with /api prefix)
app.post('/api/tokenizar', autenticar, (req: Request, res: Response) => {
  // Logic for tokenizing vehicle
  const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
  const tokenizado = { renavam, placa, proprietario, valorDoVeiculo };
  res.json(tokenizado);
});

// Routes for vehicles (with /api prefix)
app.get('/api/veiculos', autenticar, (req: Request, res: Response) => {
  // Logic for loading vehicles
  const veiculos = [
    { renavam: '1234567890', placa: 'ABC1234', proprietario: 'Proprietário 1', valorDoVeiculo: 10000 },
    { renavam: '2345678901', placa: 'DEF5678', proprietario: 'Proprietário 2', valorDoVeiculo: 20000 },
  ];
  res.json(veiculos);
});

// Routes for authorization (with /api prefix)
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Logic for authenticating user
  const usuario = { username, password };
  const token = jwt.sign(usuario, 'chave_secreta', { expiresIn: '1h' });
  res.json({ autorizado: true, token, usuario });
});

app.get('/api/verificar-autorizacao', (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'chave_secreta', (err: any, decoded: any) => {
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

app.post('/api/logout', (req: Request, res: Response) => {
  // Logic for logging out
  res.json({ autorizado: false });
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
