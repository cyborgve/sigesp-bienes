import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
export function activoIncorporado(activoUbicacion: ActivoUbicacion): boolean {
  let incorporado =
    activoUbicacion.sedeId !== 0 &&
    activoUbicacion.sedeId !== '0' &&
    activoUbicacion.sedeId !== undefined &&
    activoUbicacion.unidadAdministrativaId !== 0 &&
    activoUbicacion.unidadAdministrativaId !== '0' &&
    activoUbicacion.unidadAdministrativaId !== undefined &&
    activoUbicacion.responsableId !== undefined &&
    activoUbicacion.responsableId !== '0' &&
    activoUbicacion.responsableId !== '---' &&
    activoUbicacion.responsableId !== '--' &&
    activoUbicacion.responsableId !== '' &&
    activoUbicacion.responsableUsoId !== undefined &&
    activoUbicacion.responsableUsoId !== '0' &&
    activoUbicacion.responsableUsoId !== '---' &&
    activoUbicacion.responsableUsoId !== '--' &&
    activoUbicacion.responsableUsoId !== '';
  return incorporado;
}
