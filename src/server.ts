import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const vite = await createServer({
  root: path.join(__dirname, '..'),
  server: { 
    port: 3001,
    middlewareMode: true
  }
});

vite.middlewares.then((middle) => {
  middle.use(cors());
  middle.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    next();
  });

  middle.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Expires', '-1');
    next();
  });

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

  // Rotas para garantias
  middle.get('/garantias', autenticar, (req, res) => {
    // Lógica para carregar garantias aqui
    const garantias = [
      { id: 1, veiculo: 'Veículo 1', proprietario: 'Proprietário 1', valorDaGarantia: 1000, statusDaGarantia: 'Ativa' },
      { id: 2, veiculo: 'Veículo 2', proprietario: 'Proprietário 2', valorDaGarantia: 2000, statusDaGarantia: 'Inativa' },
    ];
    res.json(garantias);
  });

  // Rotas para tokenização
  middle.post('/tokenizar', autenticar, (req, res) => {
    // Lógica para tokenizar veículo aqui
    const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
    const tokenizado = { renavam, placa, proprietario, valorDoVeiculo };
    res.json(tokenizado);
  });

  // Rotas para veículos
  middle.get('/veiculos', autenticar, (req, res) => {
    // Lógica para carregar veículos aqui
    const veiculos = [
      { renavam: '1234567890', placa: 'ABC1234', proprietario: 'Proprietário 1', valorDoVeiculo: 10000 },
      { renavam: '2345678901', placa: 'DEF5678', proprietario: 'Proprietário 2', valorDoVeiculo: 20000 },
    ];
    res.json(veiculos);
  });

  // Rotas para autorização
  middle.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Lógica para autenticar o usuário aqui
    const usuario = { username, password };
    const token = jwt.sign(usuario, 'chave_secreta', { expiresIn: '1h' });
    res.json({ autorizado: true, token, usuario });
  });

  middle.get('/verificar-autorizacao', (req, res) => {
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

  middle.post('/logout', (req, res) => {
    // Lógica para desautenticar o usuário aqui
    res.json({ autorizado: false });
  });
});