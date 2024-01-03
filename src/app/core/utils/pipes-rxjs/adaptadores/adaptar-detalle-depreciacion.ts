import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

export const adaptarDetalleDepreciacion = () => pipe(map(adaptar));
export const adaptarDetallesDepreciacion = () =>
  pipe(map((detalles: any[]) => detalles.map(adaptar)));

const adaptar = (detalleDepreciacion: any) =>
  <DetalleDepreciacion>{
    empresaId: Number(detalleDepreciacion.empresaId),
    id: Number(detalleDepreciacion.id),
    proceso: Number(detalleDepreciacion.proceso),
    fecha: detalleDepreciacion.fecha,
    meses: Number(detalleDepreciacion.meses),
    dias: Number(detalleDepreciacion.dias),
    depreciacionMensual: Number(detalleDepreciacion.depreciacionMensual),
    depreciacionAnual: Number(detalleDepreciacion.depreciacionAnual),
    depreciacionAcumulada: Number(detalleDepreciacion.depreciacionAcumulada),
    valorContable: Number(detalleDepreciacion.valorContable),
    creado: detalleDepreciacion.creado,
    modificado: detalleDepreciacion.modificado,
  };
