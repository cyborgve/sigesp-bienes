import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';

export const adaptarAutorizacionSalida = () => pipe(map(adaptar));
export const adaptarAutorizacionesSalida = () =>
  pipe(map((autorizaciones: any[]) => autorizaciones.map(adaptar)));

const adaptar = (autorizacion: any) =>
  <AutorizacionSalida>{
    empresaId: Number(autorizacion.empresaId),
    id: Number(autorizacion.id),
    comprobante: autorizacion.comprobante,
    unidadAdministrativa: Number(autorizacion.unidadAdministrativa),
    empresaAutorizada: autorizacion.empresaAutorizada,
    personaAutorizada: autorizacion.personaAutorizada,
    testigo: autorizacion.testigo,
    explicacion: autorizacion.explicacion,
    observaciones: autorizacion.observaciones,
    activos: autorizacion.activos ? autorizacion.activos : [],
    creado: autorizacion.creado,
    modificado: autorizacion.modificado,
  };
