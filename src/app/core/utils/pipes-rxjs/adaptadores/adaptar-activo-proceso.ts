import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';

export const adaptarActivoProceso = () => pipe(map(adaptar));
export const adaptarActivosProceso = () =>
  pipe(map((activos: any[]) => activos.map(adaptar)));

const adaptar = (activo: any) =>
  <ActivoProceso>{
    empresaId: Number(activo.empresaId),
    id: Number(activo.id),
    proceso: Number(activo.proceso),
    activo: Number(activo.activo),
    tipoActivo: activo.tipoActivo,
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    creado: activo.creado,
    modificado: activo.modificado,
  };
