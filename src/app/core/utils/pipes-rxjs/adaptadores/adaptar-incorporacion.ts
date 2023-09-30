import { map } from 'rxjs/operators';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { pipe } from 'rxjs';

export const adaptarIncorporacion = () =>
  pipe(
    map(
      (incorporacion: any) =>
        <Incorporacion>{
          empresaId: Number(incorporacion.empresaId),
          id: Number(incorporacion.id),
          comprobante: incorporacion.comprobante,
          causaMovimiento: Number(incorporacion.causaMovimiento),
          unidadAdministrativa: Number(incorporacion.unidadAdministrativa),
          sede: Number(incorporacion.sede),
          fechaEntrega: incorporacion.fechaEntrega,
          responsablePrimario: incorporacion.responsablePrimario,
          responsableUso: incorporacion.responsableUso,
          activos: incorporacion.activos ? incorporacion.activos : [],
          observaciones: incorporacion.observaciones,
          creado: incorporacion.creado,
          modificado: incorporacion.modificado,
        }
    )
  );
