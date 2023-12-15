import { Integracion } from '@core/models/procesos/integracion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarIntegracion = () => pipe(map(adaptar));
export const adaptarIntegraciones = () =>
  pipe(map((integraciones: any[]) => integraciones.map(adaptar)));

const adaptar = (integracion: any) =>
  <Integracion>{
    empresaId: Number(integracion.empresaId),
    id: Number(integracion.id),
    comprobante: integracion.comprobante,
    tipoProceso: integracion.tipoProceso,
    activo: integracion.activo,
    aprobado: Number(integracion.aprobado),
    integrado: Number(integracion.integrado),
    registrado: Number(integracion.registrado),
    creado: integracion.creado,
    modificado: integracion.modificado,
  };
