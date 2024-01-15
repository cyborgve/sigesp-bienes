import { Retorno } from '@core/models/procesos/retorno';
import { RetornoService } from '@core/services/procesos/retorno.service';
import { of, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export const reversarRetorno = (_retorno: RetornoService) =>
  pipe(switchMap((retorno: Retorno) => of(retorno)));
