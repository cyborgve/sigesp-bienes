import { Activo } from '@core/models/definiciones/activo';
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
export const filtrarActivosPorCatalogoGeneral = (
  catalogoGeneral: CatalogoGeneral
) =>
  pipe(
    map((activos: Activo[]) => {
      if (catalogoGeneral)
        return activos.filter(
          activo => activo.catalogoCuentas === catalogoGeneral.catalogoCuentas
        );
      return activos;
    })
  );
