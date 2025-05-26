import express, { Request, Response, NextFunction, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Pool } from 'pg';

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

// Conecta ao banco de dados
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'nome_do_banco',
  password: 'sua_senha',
  port: 5432,
});

// Função para criar as tabelas
const criarTabelas = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS Usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS Veiculos (
      id SERIAL PRIMARY KEY,
      renavam VARCHAR(20) UNIQUE NOT NULL,
      placa VARCHAR(10) NOT NULL,
      modelo VARCHAR(100) NOT NULL,
      ano INTEGER NOT NULL,
      valor_do_veiculo DECIMAL(10, 2) NOT NULL,
      proprietario_id INTEGER NOT NULL,
      FOREIGN KEY (proprietario_id) REFERENCES Usuarios(id)
    );`,
    `CREATE TABLE IF NOT EXISTS Garantias (
      id SERIAL PRIMARY KEY,
      veiculo_id INTEGER NOT NULL,
      valor_da_garantia DECIMAL(10, 2) NOT NULL,
      status_da_garantia VARCHAR(50) NOT NULL,
      data_de_emissao DATE NOT NULL,
      FOREIGN KEY (veiculo_id) REFERENCES Veiculos(id)
    );`,
    `CREATE TABLE IF NOT EXISTS Transacoes (
      id SERIAL PRIMARY KEY,
      tipo_de_transacao VARCHAR(50) NOT NULL,
      data_da_transacao DATE NOT NULL,
      valor_da_transacao DECIMAL(10, 2) NOT NULL,
      veiculo_id INTEGER,
      garantia_id INTEGER,
      tokenizacao_id INTEGER,
      FOREIGN KEY (veiculo_id) REFERENCES Veiculos(id),
      FOREIGN KEY (garantia_id) REFERENCES Garantias(id),
      FOREIGN KEY (tokenizacao_id) REFERENCES Tokenizacoes(id)
    );`,
    `CREATE TABLE IF NOT EXISTS Tokenizacoes (
      id SERIAL PRIMARY KEY,
      veiculo_id INTEGER NOT NULL,
      data_da_tokenizacao DATE NOT NULL,
      valor_da_tokenizacao DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (veiculo_id) REFERENCES Veiculos(id)
    );`,
  ];

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    console.log('Tabelas criadas com sucesso.');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  } finally {
    await pool.end();
  }
};

// Chama a função para criar as tabelas
criarTabelas();

app.use('/api', apiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
