import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarCatalogoGeneral = () => pipe(map(adaptar));
export const adaptarCatalogosGenerales = () =>
  pipe(map((catalogos: any[]) => catalogos.map(adaptar)));

const adaptar = (catalogo: any) =>
  <CatalogoGeneral>{
    empresaId: Number(catalogo.empresaId),
    id: Number(catalogo.id),
    codigo: catalogo.codigo,
    denominacion: catalogo.denominacion,
    catalogoCuentas: catalogo.catalogoCuentas,
    cuentaReferencia: catalogo.cuentaReferencia,
    estadoMovimiento: catalogo.estadoMovimiento,
    creado: catalogo.creado,
    modificado: catalogo.modificado,
  };
