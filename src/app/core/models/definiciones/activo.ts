import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';

export interface Activo extends Basica {
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
  modeloId: Id;
  anioFabricacion: string;
  serialFabrica: string;
  colorId: Id;
  rotulacionId: Id;
  categoriaId: Id;
  activosDetalleId: Id;
  activosDepreciacionId: Id;
  activosUbicacionId: Id;
}
