import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Depreciacion } from '@core/models/procesos/depreciacion';

export const adaptarDepreciaciones = () =>
  pipe(
    map((depreciaciones: any[]) =>
      depreciaciones.map(
        depreciacion =>
          <Depreciacion>{
            empresaId: Number(depreciacion.empresaId),
            id: Number(depreciacion.id),
            comprobante: depreciacion.comprobante,
            activo: Number(depreciacion.activo),
            serial: depreciacion.serial,
            identificador: depreciacion.identificador,
            fechaCompra: depreciacion.fechaCompra,
            fechaIncorporacion: depreciacion.fechaIncorporacion,
            metodo: depreciacion.metodo,
            costo: Number(depreciacion.costo),
            valorRescate: Number(depreciacion.valorRescate),
            montoDepreciar: Number(depreciacion.montoDepreciar),
            vidaUtil: Number(depreciacion.vidaUtil),
            depreciacionMensual: Number(depreciacion.depreciacionMensual),
            depreciacionAnual: Number(depreciacion.depreciacionAnual),
            observaciones: depreciacion.observaciones,
            detalles: [],
            creado: depreciacion.creado,
            modificado: depreciacion.modificado,
          }
      )
    )
  );
