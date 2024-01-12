import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarActivosRetornoPorTipoProceso = (tipoProceso: any) =>
  pipe(
    map((activos: ActivoListaRetorno[]) =>
      tipoProceso !== 'TODOS'
        ? activos.filter(activo => activo.tipoProceso === tipoProceso)
        : activos
    )
  );
