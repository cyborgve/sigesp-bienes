import { UsuarioLogin } from '../interfaces/interfaces';
import { MConfiguracionDB } from './configuracion-db.model';

export class MUsuario {
  public nombre: string = null;
  public empresa: {
    id: number;
    titulo: string;
    periodoFiscal: string;
  } = {
    id: null,
    titulo: null,
    periodoFiscal: null,
  };
  public conexionDB: MConfiguracionDB = null;

  constructor(usuario: UsuarioLogin, db: MConfiguracionDB) {
    this.nombre = usuario.l_usuario;
    this.empresa.periodoFiscal = usuario.perfiscal;
    this.empresa.id = parseInt(usuario.id_empresa);
    this.empresa.titulo = usuario.titemp;
    this.conexionDB = db;
  }
}
