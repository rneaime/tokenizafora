interface Usuario {
  username: string;
  password: string;
}

const usuarios: Usuario[] = [];

export const cadastrarUsuario = (usuario: Usuario) => {
  usuarios.push(usuario);
};

export const verificarCredenciais = (username: string, password: string) => {
  return usuarios.some((usuario) => usuario.username === username && usuario.password === password);
};