import { ActivoUbicacion } from '@core/models/definiciones/activo-ubicacion';

export const comprobarActivoIncorporado = (ubicacion: ActivoUbicacion) => {
  let { sedeId, unidadAdministrativaId, responsableId, responsableUsoId } =
    ubicacion;
  let incorporado = [
    sedeId !== 0,
    !Number.isNaN(sedeId),
    sedeId !== null,
    unidadAdministrativaId !== 0,
    !Number.isNaN(unidadAdministrativaId),
    unidadAdministrativaId !== null,
    responsableId !== null,
    responsableId !== '0',
    responsableId !== '---',
    responsableId !== '--',
    responsableId !== '',
    responsableUsoId !== null,
    responsableUsoId !== '0',
    responsableUsoId !== '---',
    responsableUsoId !== '--',
    responsableUsoId !== '',
  ];
  return incorporado.every(valor => !!valor);
};
