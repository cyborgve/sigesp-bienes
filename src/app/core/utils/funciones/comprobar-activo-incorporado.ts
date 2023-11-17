import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

export const comprobarActivoIncorporado = (ubicacion: ActivoUbicacion) => {
  let incorporado = [
    ubicacion.sedeId !== 0,
    ubicacion.sedeId !== '0',
    ubicacion.sedeId !== null,
    ubicacion.unidadAdministrativaId !== 0,
    ubicacion.unidadAdministrativaId !== '0',
    ubicacion.unidadAdministrativaId !== null,
    ubicacion.responsableId !== null,
    ubicacion.responsableId !== '0',
    ubicacion.responsableId !== '---',
    ubicacion.responsableId !== '--',
    ubicacion.responsableId !== '',
    ubicacion.responsableUsoId !== null,
    ubicacion.responsableUsoId !== '0',
    ubicacion.responsableUsoId !== '---',
    ubicacion.responsableUsoId !== '--',
    ubicacion.responsableUsoId !== '',
  ];
  return incorporado.every(valor => !!valor);
};
