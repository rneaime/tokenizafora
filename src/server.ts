1 | import express, { Request, Response } from 'express';
 2 | import bodyParser from 'body-parser';
 3 | import jwt from 'jsonwebtoken';
 4 | import path from 'path';
 5 | import cors from 'cors';
 6 | 
 7 | const app = express();
 8 | app.use(bodyParser.json());
 9 | app.use(cors());
10 | app.use(express.static('public'));
11 | app.use(express.static('dist'));
12 | 
13 | // Desativa o cache
14 | app.use((req, res, next) => {
15 |   res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
16 |   res.setHeader('Expires', '-1');
17 |   next();
18 | });
19 | 
20 | // Middleware de autenticação
21 | const autenticar = (req: Request, res: Response, next: any) => {
22 |   const token = req.headers.authorization;
23 |   if (token) {
24 |     jwt.verify(token, 'chave_secreta', (err, decoded) => {
25 |       if (err) {
26 |         res.status(401).json({ mensagem: 'Acesso não autorizado' });
27 |       } else {
28 |         next();
29 |       }
30 |     });
31 |   } else {
32 |     res.status(401).json({ mensagem: 'Acesso não autorizado' });
33 |   }
34 | };
35 | 
36 | // Rotas para garantias
37 | app.get('/garantias', autenticar, (req: Request, res: Response) => {
38 |   // Lógica para carregar garantias aqui
39 |   const garantias = [
40 |     { id: 1, veiculo: 'Veículo 1', proprietario: 'Proprietário 1', valorDaGarantia: 1000, statusDaGarantia: 'Ativa' },
41 |     { id: 2, veiculo: 'Veículo 2', proprietario: 'Proprietário 2', valorDaGarantia: 2000, statusDaGarantia: 'Inativa' },
42 |   ];
43 |   res.json(garantias);
44 | });
45 | 
46 | app.post('/garantias', autenticar, (req: Request, res: Response) => {
47 |   // Lógica para criar garantia aqui
48 |   const { id, veiculo, proprietario, valorDaGarantia, statusDaGarantia } = req.body;
49 |   const garantia = { id, veiculo, proprietario, valorDaGarantia, statusDaGarantia };
50 |   console.log(garantia);
51 |   res.json(garantia);
52 | });
53 | 
54 | // Rotas para tokenização
55 | app.post('/tokenizar', autenticar, (req: Request, res: Response) => {
56 |   // Lógica para tokenizar veículo aqui
57 |   const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
58 |   const tokenizado = { renavam, placa, proprietario, valorDoVeiculo };
59 |   res.json(tokenizado);
60 | });
61 | 
62 | // Rotas para veículos
63 | app.get('/veiculos', autenticar, (req: Request, res: Response) => {
64 |   // Lógica para carregar veículos aqui
65 |   const veiculos = [
66 |     { renavam: '1234567890', placa: 'ABC1234', proprietario: 'Proprietário 1', valorDoVeiculo: 10000 },
67 |     { renavam: '2345678901', placa: 'DEF5678', proprietario: 'Proprietário 2', valorDoVeiculo: 20000 },
68 |   ];
69 |   res.json(veiculos);
70 | });
71 | 
72 | app.post('/veiculos', autenticar, (req: Request, res: Response) => {
73 |   // Lógica para criar veículo aqui
74 |   const { renavam, placa, proprietario, valorDoVeiculo } = req.body;
75 |   const veiculo = { renavam, placa, proprietario, valorDoVeiculo };
76 |   console.log(veiculo);
77 |   res.json(veiculo);
78 | });
79 | 
80 | // Rotas para autorização
81 | app.post('/login', (req: Request, res: Response) => {
82 |   const { username, password } = req.body;
83 |   // Lógica para autenticar o usuário aqui
84 |   const usuario = { username, password };
85 |   const token = jwt.sign(usuario, 'chave_secreta', { expiresIn: '1h' });
86 |   res.json({ autorizado: true, token, usuario });
87 | });
88 |
