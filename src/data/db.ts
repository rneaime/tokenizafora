interface Usuario {
  id: number;
  username: string;
  password: string;
}

interface Garantia {
  id: number;
  veiculo: string;
  proprietario: string;
  valorDaGarantia: number;
  statusDaGarantia: string;
}

interface Veiculo {
  id: number;
  renavam: string;
  placa: string;
  proprietario: string;
  valorDoVeiculo: number;
}

const usuarios: Usuario[] = [];
const garantias: Garantia[] = [];
const veiculos: Veiculo[] = [];

export const criarUsuario = (usuario: Omit<Usuario, 'id'>) => {
  const novoUsuario: Usuario = {
    id: usuarios.length + 1,
    ...usuario,
  };
  usuarios.push(novoUsuario);
  return novoUsuario;
};

export const criarGarantia = (garantia: Omit<Garantia, 'id'>) => {
  const novaGarantia: Garantia = {
    id: garantias.length + 1,
    ...garantia,
  };
  garantias.push(novaGarantia);
  return novaGarantia;
};

export const criarVeiculo = (veiculo: Omit<Veiculo, 'id'>) => {
  const novoVeiculo: Veiculo = {
    id: veiculos.length + 1,
    ...veiculo,
  };
  veiculos.push(novoVeiculo);
  return novoVeiculo;
};

export const carregarUsuarios = () => usuarios;
export const carregarGarantias = () => garantias;
export const carregarVeiculos = () => veiculos;