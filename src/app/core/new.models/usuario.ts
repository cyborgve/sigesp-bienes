import { ConfiguracionDB } from './configuracion-db';
import { Empresa } from './empresa';

export interface Usuario {
  id: string;
  nombre: string;
  empresa: Empresa;
  configuracionDB: ConfiguracionDB;
}
