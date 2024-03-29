import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';

export const adaptarCambioResponsable = () => pipe(map(adaptar));
export const adaptarCambiosResponsable = () =>
  pipe(map((cambios: any[]) => cambios.map(adaptar)));

const adaptar = (cambioResponsable: any) =>
  <CambioResponsable>{
    empresaId: Number(cambioResponsable.empresaId),
    id: Number(cambioResponsable.id),
    comprobante: cambioResponsable.comprobante,
    activo: Number(cambioResponsable.activo),
    identificador: cambioResponsable.identificador,
    serial: cambioResponsable.serial,
    tipoResponsable: Number(cambioResponsable.tipoResponsable),
    responsableActual: cambioResponsable.responsableActual,
    nuevoResponsable: cambioResponsable.nuevoResponsable,
    observaciones: cambioResponsable.observaciones,
    creado: cambioResponsable.creado,
    modificado: cambioResponsable.modificado,
  };
