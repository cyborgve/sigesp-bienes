import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';
import { TipoProceso } from '@core/types/tipo-proceso';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarActivosRetornoPorTipoProceso = (tipoProceso: any) =>
  pipe(
    map((activos: ActivoListaRetorno[]) =>
      tipoProceso === 'TODOS'
        ? activos
        : activos.filter(activo => activo.tipoProceso === tipoProceso)
    )
  );
