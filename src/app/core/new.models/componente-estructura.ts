import { Basica } from './basica';

export interface ComponenteEstructura extends Basica {
  id_empresa: string;
  id_tipest: string;
  id_comest: string;
  codcomest: string;
  dencomest: string;
}
