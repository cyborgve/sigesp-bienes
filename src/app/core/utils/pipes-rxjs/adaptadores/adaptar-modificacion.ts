import { Modificacion } from '@core/models/procesos/modificacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarModificacion = () => pipe(map(adaptar));
export const adaptarModificaciones = () =>
  pipe(map((modificaciones: any[]) => modificaciones.map(adaptar)));

const adaptar = (modificacion: any) =>
  <Modificacion>{
    empresaId: Number(modificacion.empresaId),
    id: Number(modificacion.id),
    comprobante: modificacion.comprobante,
    activo: Number(modificacion.activo),
    identificador: modificacion.identificador,
    serial: modificacion.serial,
    causaMovimiento: Number(modificacion.causaMovimiento),
    observaciones: modificacion.observaciones,
    modificaciones: modificacion.modificaciones
      ? modificacion.modificaciones
      : [],
    cuentasContables: modificacion.cuentasContables
      ? modificacion.cuentasContables
      : [],
    creado: modificacion.creado,
    modificado: modificacion.modificado,
  };
