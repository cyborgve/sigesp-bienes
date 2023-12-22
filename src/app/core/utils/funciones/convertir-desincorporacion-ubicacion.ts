import { DesincorporacionUbicacion } from '@core/models/auxiliares/desincorporacion-ubicacion';
import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

export const convertirDesincorporacionUbicacion = (
  ubicacion: ActivoUbicacion
) =>
  <DesincorporacionUbicacion>{
    empresaId: ubicacion.empresaId,
    id: ubicacion.id,
    activo: ubicacion.activoId,
    proceso: undefined,
    unidadAdministrativa: ubicacion.unidadAdministrativaId,
    sede: ubicacion.sedeId,
    responsable: ubicacion.responsableId,
    responsableUso: ubicacion.responsableUsoId,
    creado: new Date(),
    modificado: new Date(),
  };
