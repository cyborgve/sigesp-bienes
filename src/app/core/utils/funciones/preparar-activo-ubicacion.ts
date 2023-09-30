import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

export const prepararActivoUbicacion = (ubicacion: any) => {
  return <ActivoUbicacion>{
    empresaId: Number(ubicacion.empresaId),
    id: Number(ubicacion.id),
    activoId: Number(ubicacion.activoId),
    sedeId: Number(ubicacion.sedeId),
    unidadAdministrativaId: Number(ubicacion.unidadAdministrativaId),
    fechaIngreso: ubicacion.fechaIngreso,
    estadoUsoId: Number(ubicacion.estadoUsoId),
    estadoConservacionId: Number(ubicacion.estadoConservacionId),
    descripcionEstadoConservacion: ubicacion.descripcionEstadoConservacion,
    responsableId: ubicacion.responsableId,
    responsableUsoId: ubicacion.responsableUsoId,
    creado: ubicacion.creado,
    modificado: ubicacion.modificado,
  };
};
