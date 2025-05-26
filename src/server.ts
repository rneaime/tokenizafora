import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app for the backend API
const app = express();
const PORT = 3001; // Backend on port 3001

// Configure middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// Configure headers for caching and content types
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  next();
});

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
// Middleware de autenticação
const autenticar = (req, res, next) => {
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

// API Routes - All API routes have /api prefix
const apiRouter = express.Router();

// Rotas para garantias
apiRouter.get('/garantias', autenticar, (req, res) => {
  // Lógica para carregar garantias aqui
  const garantias = [
    { id: 1, veiculo: 'Veículo 1', proprietario: 'Proprietário 1', valorDaGarantia: 1000, statusDaGarantia: 'Ativa' },
    { id: 2, veiculo: 'Veículo 2', proprietario: 'Proprietário 2', valorDaGarantia: 2000, statusDaGarantia: 'Inativa' },
  ];
  res.json(garantias);
});

// Rotas para tokenização
apiRouter.post('/tokenizar', autenticar, (req, res) => {
  // Lógica para tokenizar veículo aqui
  const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
  const tokenizado = { renavam, placa, proprietario, valorDoVeiculo };
  res.json(tokenizado);
});

// Rotas para veículos
apiRouter.get('/veiculos', autenticar, (req, res) => {
  // Lógica para carregar veículos aqui
  const veiculos = [
    { renavam: '1234567890', placa: 'ABC1234', proprietario: 'Proprietário 1', valorDoVeiculo: 10000 },
    { renavam: '2345678901', placa: 'DEF5678', proprietario: 'Proprietário 2', valorDoVeiculo: 20000 },
  ];
  res.json(veiculos);
});

// Rotas para autorização
apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Lógica para autenticar o usuário aqui
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username, password }, 'chave_secreta', { expiresIn: '1h' });
    res.json({ autorizado: true, token, usuario: { username, password } });
  } else {
    res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
  }
});

apiRouter.get('/verificar-autorizacao', (req, res) => {
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

apiRouter.post('/logout', (req, res) => {
  // Lógica para desautenticar o usuário aqui
  res.json({ autorizado: false });
});

// Mount API router with /api prefix
app.use('/api', apiRouter);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message 
  });
});

// For any other request, serve the frontend app
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});