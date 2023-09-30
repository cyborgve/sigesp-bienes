import { Retorno } from '@core/models/procesos/retorno';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const ejecutarRetorno = () => pipe(map((retorno: Retorno) => retorno));
