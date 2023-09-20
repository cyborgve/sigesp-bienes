import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Reasignacion } from '@core/models/procesos/reasignacion';
export const adaptarReasignacion = () =>
  pipe(
    map(
      (reasignacion: any) =>
        <Reasignacion>{
          empresaId: Number(reasignacion.empresaId),
          id: Number(reasignacion.id),
          comprobante: reasignacion.comprobante,
          causaMovimiento: Number(reasignacion.causaMovimiento),
          responsablePrimario: reasignacion.responsablePrimario,
          responsableUso: reasignacion.responsableUso,
          sede: Number(reasignacion.sede),
          fechaEntrega: reasignacion.fechaEntrega,
          observaciones: reasignacion.observaciones,
          activos: reasignacion.activos ? reasignacion.activos : [],
          creado: reasignacion.creado,
          modificado: reasignacion.modificado,
        }
    )
  );
