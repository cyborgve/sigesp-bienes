import { Basica } from '@core/models/auxiliares/basica';
import { Id } from '@core/types/id';
import { ActivoComponente } from './activo-componente';
import { ActivoDepreciacion } from './activo-depreciacion';
import { ActivoDetalle } from './activo-detalle';
import { ActivoUbicacion } from './activo-ubicacion';

export interface Activo extends Basica {
  codigo: string;
  tipoActivo: string;
  fechaRegistro: Date;
  catalogoCuentas: Id;
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
  detalle: ActivoDetalle;
  componentes: ActivoComponente[];
  depreciacion: ActivoDepreciacion;
  ubicacion: ActivoUbicacion;
}
