import { Basica } from './basica';

export interface CondicionCompra extends Basica {
  id_empresa: string;
  id_concompra: string;
  codconcom: string;
  denconcom: string;
  explicacion: string;
}
