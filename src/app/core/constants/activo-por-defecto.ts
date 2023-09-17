import { Activo } from '@core/models/definiciones/activo';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

const activoDetalle = <ActivoDetalle>{};
const activoComponentes = [];
const activoDepreciacion = <ActivoDepreciacion>{};
const activoUbicacion = <ActivoUbicacion>{};

export const ACTIVO_POR_DEFECTO: Activo = {
  empresaId: 0,
  id: 0,
  codigo: 'AUTOGENERADO',
  tipoActivo: '',
  fechaRegistro: new Date(),
  catalogoCuentas: undefined,
  serialRotulacion: undefined,
  denominacion: 'ACTIVO GENERADO POR EL SISTEMA PARA USO EN MEMORIA UNICAMENTE',
  observaciones: 'ESTE ACTIVO NO DEBE SER ALMACENADO',
  fechaAdquisicion: new Date(),
  valorAdquisicion: 0,
  monedaId: '---',
  modeloId: 0,
  anioFabricacion: new Date().getFullYear().toString(),
  serialFabrica: undefined,
  colorId: 0,
  rotulacionId: 0,
  categoriaId: 0,
  detalle: activoDetalle,
  componentes: activoComponentes,
  depreciacion: activoDepreciacion,
  ubicacion: activoUbicacion,
  creado: new Date(),
  modificado: new Date(),
};
