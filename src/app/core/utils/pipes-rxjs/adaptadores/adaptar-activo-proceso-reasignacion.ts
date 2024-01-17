import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoProcesoReasignacion } from '@core/models/auxiliares/activo-proceso-reasignacion';

export const adaptarActivoProcesoReasignacion = () => pipe(map(adaptar));
export const adaptarActivosProcesoReasignacion = () =>
  pipe(map((activos: any[]) => activos.map(adaptar)));

const adaptar = (activo: any) =>
  <ActivoProcesoReasignacion>{
    empresaId: Number(activo.empresaId),
    id: Number(activo.id),
    proceso: Number(activo.proceso),
    activo: Number(activo.activo),
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    responsableAnterior: activo.responsableAnterior,
    responsableUsoAnterior: activo.responsableUsoAnterior,
    creado: activo.creado,
    modificado: activo.modificado,
  };
