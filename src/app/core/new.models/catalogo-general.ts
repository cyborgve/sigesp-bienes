import { Basica } from './basica';

export interface CatalogoGeneral extends Basica {
  id_empresa: string;
  catcta: string;
  dencat: string;
  ctaref: string;
  estmov: string;
}
