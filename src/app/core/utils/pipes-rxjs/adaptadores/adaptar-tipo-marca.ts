import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { TipoMarca } from '@core/models/definiciones/tipo-marca';

export const adaptarTipoMarca = () => pipe(map(adaptar));
export const adaptarTiposMarca = () =>
  pipe(map((tiposMarca: any[]) => tiposMarca.map(adaptar)));

const adaptar = (tipoMarca: any) =>
  <TipoMarca>{
    empresaId: Number(tipoMarca.empresaId),
    id: Number(tipoMarca.id),
    codigo: tipoMarca.codigo,
    denominacion: tipoMarca.denominacion,
    creado: tipoMarca.creado,
    modificado: tipoMarca.modificado,
  };
