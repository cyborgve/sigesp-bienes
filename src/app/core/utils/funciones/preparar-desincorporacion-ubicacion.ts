import { DesincorporacionUbicacion } from '@core/models/auxiliares/desincorporacion-ubicacion';

export const prepararDesincorporacionUbicacion = (
  desincorporacionUbicacion: any
) =>
  <DesincorporacionUbicacion>{
    empresaId: Number(desincorporacionUbicacion.empresaId),
    id: Number(desincorporacionUbicacion.id),
    proceso: Number(desincorporacionUbicacion.proceso),
    activo: Number(desincorporacionUbicacion.activo),
    unidadAdministrativa: Number(
      desincorporacionUbicacion.unidadAdministrativa
    ),
    sede: Number(desincorporacionUbicacion.sede),
    responsable: desincorporacionUbicacion.responsable,
    responsableUso: desincorporacionUbicacion.responsableUso,
    creado: desincorporacionUbicacion.creado,
    modificado: desincorporacionUbicacion.modificado,
  };
