import { Basica } from '../auxiliares/basica';

export interface CatalogoGeneral extends Basica {
  codigo: string;
  catalogoCuentas: string;
  denominacion: string;
  cuentaReferencia: string;
  estadoMovimiento: string;
}
