import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';

export const adaptarActivosProceso = () =>
  pipe(
    map((activos: any[]) =>
      activos.map(
        activo =>
          <ActivoProceso>{
            empresaId: Number(activo.empresaId),
            id: Number(activo.id),
            proceso: Number(activo.proceso),
            activo: Number(activo.activo),
            tipoActivo: activo.tipoActivo,
            codigo: activo.codigo,
            denominacion: activo.denominacion,
            creado: activo.creado,
            modificado: activo.modificado,
          }
      )
    )
  );
