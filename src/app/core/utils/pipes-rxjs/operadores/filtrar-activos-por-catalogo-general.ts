import { Activo } from '@core/models/definiciones/activo';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
export const filtrarActivosPorCatalogoGeneral = (
  catalogoGeneral: CatalogoGeneral
) =>
  pipe(
    map((activos: Activo[]) =>
      catalogoGeneral
        ? activos.filter(
            activo => activo.catalogoCuentas === catalogoGeneral.catalogoCuentas
          )
        : activos
    )
  );
