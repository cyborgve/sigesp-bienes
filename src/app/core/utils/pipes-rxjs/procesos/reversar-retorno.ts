import { RetornoService } from '@core/services/procesos/retorno.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export const reversarRetorno = (_retorno: RetornoService) => pipe(tap());
