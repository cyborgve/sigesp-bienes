import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
export const adaptarAutorizacionSalida = () =>
  pipe(
    map(
      (autorizacionSalida: any) =>
        <AutorizacionSalida>{
          empresaId: Number(autorizacionSalida.empresaId),
          id: Number(autorizacionSalida.id),
          comprobante: autorizacionSalida.comprobante,
          unidadAdministrativa: Number(autorizacionSalida.unidadAdministrativa),
          empresaAutorizada: autorizacionSalida.empresaAutorizada,
          personaAutorizada: autorizacionSalida.personaAutorizada,
          explicacion: autorizacionSalida.explicacion,
          observaciones: autorizacionSalida.observaciones,
          activos: autorizacionSalida.activos ? autorizacionSalida.activos : [],
          creado: autorizacionSalida.creado,
          modificado: autorizacionSalida.modificado,
        }
    )
  );
