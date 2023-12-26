import { DesincorporacionUbicacion } from '@core/models/auxiliares/desincorporacion-ubicacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

export const convertirDesincorporacionUbicacion = (
  activoUbicacion: ActivoUbicacion
) =>
  <DesincorporacionUbicacion>{
    empresaId: 0,
    id: 0,
    proceso: 0,
    activo: activoUbicacion.activoId,
    unidadAdministrativa: activoUbicacion.unidadAdministrativaId,
    sede: activoUbicacion.sedeId,
    responsable: activoUbicacion.responsableId,
    responsableUso: activoUbicacion.responsableUsoId,
    creado: new Date(),
    modificado: new Date(),
  };
