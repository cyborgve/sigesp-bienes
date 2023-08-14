import { Incorporacion } from '@core/models/procesos/incorporacion';

export function prepararIncorporacion(incorporacion: any): Incorporacion {
  return <Incorporacion>{
    empresaId: Number(incorporacion.empresaId) | 0,
    id: Number(incorporacion.id) | 0,
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
  };
}
