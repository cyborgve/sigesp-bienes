import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarActivoListaRetorno = () => pipe(map(adaptar));
export const adaptarActivosListaRetorno = () =>
  pipe(map((lista: any[]) => lista.map(adaptar)));

const adaptar = (activo: any) =>
  <ActivoListaRetorno>{
    empresaId: Number(activo.empresaId),
    id: Number(activo.id),
    tipoProceso: activo.tipoProceso,
    proceso: activo.proceso,
    fechaProceso: activo.fechaProceso,
    activo: activo.activo,
    tipoActivo: activo.tipoActivo,
    denominacion: activo.denominacion,
    codigo: activo.codigo,
    creado: activo.creado,
    modificado: activo.modificado,
  };
