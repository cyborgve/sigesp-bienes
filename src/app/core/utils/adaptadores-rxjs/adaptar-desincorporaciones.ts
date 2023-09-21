import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';

export const adaptarDesincorporaciones = () =>
  pipe(
    map((desincorporaciones: any[]) =>
      desincorporaciones.map(
        desincorporacion =>
          <Desincorporacion>{
            empresaId: Number(desincorporacion.empresaId),
            id: Number(desincorporacion.id),
            comprobante: desincorporacion.comprobante,
            causaMovimiento: Number(desincorporacion.causaMovimiento),
            unidadAdministrativa: Number(desincorporacion.unidadAdministrativa),
            observaciones: desincorporacion.observaciones,
            activos: desincorporacion.activos ? desincorporacion.activos : [],
            cuentasContables: desincorporacion.cuentasContables
              ? desincorporacion.cuentasContables
              : [],
            creado: desincorporacion.creado,
            modificado: desincorporacion.modificado,
          }
      )
    )
  );