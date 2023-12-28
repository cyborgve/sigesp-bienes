import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { Id } from '@core/types/id';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarUnidadesAdministrativasNoSeleccionadas = (ids: Id[]) =>
  pipe(
    map((unidadesAdministrativas: UnidadAdministrativa[]) =>
      unidadesAdministrativas.filter(
        unidadAdministrativa => !ids.includes(unidadAdministrativa.id)
      )
    )
  );
