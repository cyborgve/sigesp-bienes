import { RetornoService } from '@core/services/procesos/retorno.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export const ejecutarRetorno = (_retorno: RetornoService) => pipe(tap());
