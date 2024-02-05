import { Activo } from '@core/models/definiciones/activo';
import { Incorporacion } from '@core/models/procesos/incorporacion';

export const convertirActivoIncorporacion = (activo: Activo) => {
  let {
    responsableId,
    responsableUsoId,
    unidadAdministrativaId,
    sedeId,
    fechaIngreso,
  } = activo.ubicacion;
  let incorporacion = <Incorporacion>{
    empresaId: 0,
    id: 0,
    comprobante: '000-00000000',
    causaMovimiento: 1, //TODO: colocar seleccionar causa de movimiento
    responsablePrimario: responsableId,
    responsableUso: responsableUsoId,
    unidadAdministrativa: unidadAdministrativaId,
    sede: sedeId,
    fechaEntrega: fechaIngreso,
    observaciones: 'Generada en la migración',
    activos: [],
    creado: new Date(), //TODO: colocar seleccionar fecha de incorporacion
    modificado: new Date(),
  };
  return incorporacion;
};
