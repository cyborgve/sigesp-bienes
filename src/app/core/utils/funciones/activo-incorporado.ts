import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
export function activoIncorporado(activoUbicacion: ActivoUbicacion): boolean {
  let incorporado =
    activoUbicacion.sedeId !== 0 &&
    activoUbicacion.unidadAdministrativaId !== 0 &&
    activoUbicacion.responsableId !== '---' &&
    activoUbicacion.responsableUsoId !== '---';
  return incorporado;
}
