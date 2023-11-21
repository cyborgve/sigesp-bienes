import { map } from 'rxjs/operators';
import { Id } from '@core/types/id';
import { pipe } from 'rxjs';
import { Activo } from '@core/models/definiciones/activo';
export const filtrarActivosPorRotulacion = (rotulacion: Id) =>
  pipe(
    map((activos: Activo[]) =>
      rotulacion && rotulacion !== 0
        ? activos.filter(activo => activo.rotulacionId === rotulacion)
        : activos
    )
  );
