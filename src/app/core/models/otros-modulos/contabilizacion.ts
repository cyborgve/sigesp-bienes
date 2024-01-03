import { Activo } from '../definiciones/activo';

export interface Contabilizacion {
  tipo: 'contabilizar' | 'reversarContabilizar';
  bienes: {
    procede: 'SBNCAJ' | 'SBNCDN' | 'SBNCDP';
    bienes: Activo[];
  };
}
