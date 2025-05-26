import express, { Request, Response, NextFunction, Router } from 'express';
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
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '-1');
  next();
});

// Define public directory path properly for ES modules
const publicPath = path.join(__dirname, '../public');
const distPath = path.join(__dirname, '../dist');

// Serve static files with proper content types
app.use(express.static(distPath, {
  setHeaders: (res: Response, filePath: string) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));
// Interface for JWT payload
interface JWTPayload {
  username: string;
  password: string;
  [key: string]: any;
}

// Middleware de autenticação
const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'chave_secreta', (err: jwt.VerifyErrors | null, decoded: any) => {
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
const apiRouter: Router = express.Router();

// Rotas para garantias
apiRouter.get('/garantias', autenticar, (req: Request, res: Response) => {
  // Lógica para carregar garantias aqui
  const garantias = [
    { id: 1, veiculo: 'Veículo 1', proprietario: 'Proprietário 1', valorDaGarantia: 1000, statusDaGarantia: 'Ativa' },
    { id: 2, veiculo: 'Veículo 2', proprietario: 'Proprietário 2', valorDaGarantia: 2000, statusDaGarantia: 'Inativa' },
  ];
  res.json(garantias);
});

// Rotas para tokenização
apiRouter.post('/tokenizar', autenticar, (req: Request, res: Response) => {
  // Lógica para tokenizar veículo aqui
  const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
  const tokenizado = { renavam, placa, proprietario, valorDoVeiculo };
  res.json(tokenizado);
});

// Rotas para veículos
apiRouter.get('/veiculos', autenticar, (req: Request, res: Response) => {
  // Lógica para carregar veículos aqui
  const veiculos = [
    { renavam: '1234567890', placa: 'ABC1234', proprietario: 'Proprietário 1', valorDoVeiculo: 10000 },
    { renavam: '2345678901', placa: 'DEF5678', proprietario: 'Proprietário 2', valorDoVeiculo: 20000 },
  ];
  res.json(veiculos);
});

// Rota para login
apiRouter.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota para realizar login
apiRouter.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Lógica para realizar o login aqui
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username, password }, 'chave_secreta', {
      expiresIn: '1h'
    });
    res.json({ token });
  } else {
    res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }
});

app.use('/api', apiRouter);

app.get('/favicon.ico', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/favicon.ico'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});