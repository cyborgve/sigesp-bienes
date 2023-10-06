import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';

export const catalogoOrdenadoPorCuentas = () =>
  pipe(
    map((catalogos: CatalogoGeneral[]) =>
      catalogos.sort((a, b) => (a.catalogoCuentas > b.catalogoCuentas ? 1 : -1))
    )
  );
