import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

export const adaptarDetallesDepreciacion = () =>
  pipe(
    map((detallesDepreciacion: any[]) =>
      detallesDepreciacion.map(
        detalleDepreciacion =>
          <DetalleDepreciacion>{
            proceso: Number(detalleDepreciacion.proceso),
            empresaId: Number(detalleDepreciacion.empresaId),
            id: Number(detalleDepreciacion.id),
            fecha: detalleDepreciacion.fecha,
            meses: Number(detalleDepreciacion.meses),
            dias: Number(detalleDepreciacion.dias),
            depreciacionMensual: Number(
              detalleDepreciacion.depreciacionMensual
            ),
            depreciacionAnual: Number(detalleDepreciacion.depreciacionAnual),
            depreciacionAcumulada: Number(
              detalleDepreciacion.depreciacionAcumulada
            ),
            valorContable: Number(detalleDepreciacion.valorContable),
            creado: detalleDepreciacion.creado,
            modificado: detalleDepreciacion.modificado,
          }
      )
    )
  );
