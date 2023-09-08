import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Depreciacion } from '@core/models/procesos/depreciacion';

export const adaptarDepreciacion = () =>
  pipe(
    map(
      (depreciacion: any) =>
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
          depreciacionMensual: Number(depreciacion.mensual),
          depreciacionAnual: Number(depreciacion.anual),
          observaciones: depreciacion.observaciones,
          detalles: [],
          creado: depreciacion.creado,
          modificado: depreciacion.modificado,
        }
    )
  );