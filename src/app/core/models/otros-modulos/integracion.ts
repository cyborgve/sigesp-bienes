import { Activo } from '../definiciones/activo';

export interface Integracion {
  tipo: 'contabilizar' | 'reversarContabilizar';
  bienes: {
    procede: 'SBNCAJ' | 'SBNCDN' | 'SBNCDP';
    bienes: Activo[];
  };
}
