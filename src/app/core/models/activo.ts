import { Basica } from '@core/models/basica';
import { Id } from '@core/types/id';

export interface Activo extends Basica {
  empresaId: Id;
  id: Id;
  codigo: string;
  tipoActivo: string;
  fechaRegistro: Date;
  catalogoCuentas: string;
  serialRotulacion: string;
  denominacion: string;
  observaciones: string;
  fechaAdquisicion: Date;
  valorAdquisicion: number;
  monedaId: string;
  marcaId: Id;
  modeloId: Id;
  anioFabricacion: string;
  serialFabrica: string;
  colorId: Id;
  rotulacionId: Id;
  categoriaId: Id;
}
