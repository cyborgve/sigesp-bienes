import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoProcesoRetorno } from '@core/models/auxiliares/activo-proceso-retorno';

export const adaptarActivoProcesoRetorno = () => pipe(map(adaptar));
export const adaptarActivosProcesoRetorno = () =>
  pipe(map((activos: any[]) => activos.map(adaptar)));

const adaptar = (activo: any) =>
  <ActivoProcesoRetorno>{
    empresaId: Number(activo.empresaId),
    id: Number(activo.id),
    proceso: Number(activo.proceso),
    activo: Number(activo.activo),
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    documentoRelacionado: activo.documentoRelacionado,
    creado: activo.creado,
    modificado: activo.modificado,
  };
