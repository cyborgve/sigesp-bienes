import { Retorno } from '@core/models/procesos/retorno';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const reversarRetorno = () => pipe(map((retorno: Retorno) => retorno));
