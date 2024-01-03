import { Id } from '@core/types/id';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

export const puedeActualizarFormulario = (valorActual: Id) =>
  pipe(filter((entidad: any) => entidad.id !== valorActual));
