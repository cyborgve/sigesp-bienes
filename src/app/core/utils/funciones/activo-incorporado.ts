/**
 * Comprueba si el objeto `activoUbicacion` dado está completamente incorporado.
 *
 * @param {ActivoUbicacion} activoUbicacion - El objeto que representa la ubicación del activo.
 * @return {boolean} Devuelve `true` si todas las propiedades de `activoUbicacion` cumplen las condiciones, de lo contrario devuelve `false`.
 */ import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';
export const activoIncorporado = (activoUbicacion: ActivoUbicacion) => {
  let incorporado = [
    activoUbicacion.sedeId !== 0,
    activoUbicacion.sedeId !== '0',
    activoUbicacion.sedeId !== undefined,
    activoUbicacion.unidadAdministrativaId !== 0,
    activoUbicacion.unidadAdministrativaId !== '0',
    activoUbicacion.unidadAdministrativaId !== undefined,
    activoUbicacion.responsableId !== undefined,
    activoUbicacion.responsableId !== '0',
    activoUbicacion.responsableId !== '---',
    activoUbicacion.responsableId !== '--',
    activoUbicacion.responsableId !== '',
    activoUbicacion.responsableUsoId !== undefined,
    activoUbicacion.responsableUsoId !== '0',
    activoUbicacion.responsableUsoId !== '---',
    activoUbicacion.responsableUsoId !== '--',
    activoUbicacion.responsableUsoId !== '',
  ];
  return incorporado.every(valor => !!valor);
};
