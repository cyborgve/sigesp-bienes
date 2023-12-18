import { EntregaUnidadService } from '@core/services/procesos/entrega-unidad.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export const reversarEntregaUnidad = (_entregaUnidad: EntregaUnidadService) =>
  pipe(tap());
