import { Id } from '@core/types/id';

export interface ActivoComponente {
  empresaId: Id;
  id: Id;
  activoId: Id;
  denominacion: string;
  especificaciones: string;
  tipo: Id;
  marcaId: Id;
  modeloId: Id;
  creado: Date;
  modificado: Date;
}
