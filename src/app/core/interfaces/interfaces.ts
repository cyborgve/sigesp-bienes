export interface ConfiguracionDB {
  basededatos: string;
  gestor: string;
  login: string;
  nombre: string;
  password: string;
  puerto: string;
  servidor: string;
}

export interface UsuarioLogin {
  basededatos: string;
  id_empresa: string;
  l_usuario: string;
  login: string;
  mensaje: string;
  password: string;
  password_usu: string;
  perfiscal: string;
  puerto: string;
  resultado: string;
  servidor: string;
  titemp: string;
}
