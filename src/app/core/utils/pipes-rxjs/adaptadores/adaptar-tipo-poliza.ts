import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { TipoPoliza } from '@core/models/definiciones/tipo-poliza';

export const adaptarTipoPoliza = () => pipe(map(adaptar));
export const adaptarTiposPoliza = () =>
  pipe(map((tiposPoliza: any[]) => tiposPoliza.map(adaptar)));

const adaptar = (tipoPoliza: any) =>
  <TipoPoliza>{
    empresaId: Number(tipoPoliza.empresaId),
    id: Number(tipoPoliza.id),
    codigo: tipoPoliza.codigo,
    denominacion: tipoPoliza.denominacion,
    creado: tipoPoliza.creado,
    modificado: tipoPoliza.modificado,
  };
