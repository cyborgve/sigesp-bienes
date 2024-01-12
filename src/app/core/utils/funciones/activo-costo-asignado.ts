import { Activo } from '@core/models/definiciones/activo';

export const activoCostoAsignado = (activo: Activo) => {
  let { valorAdquisicion } = activo;
  let comprobaciones = [
    valorAdquisicion !== null,
    !Number.isNaN(valorAdquisicion),
    valorAdquisicion !== 0,
  ];
  return comprobaciones.every(todo => todo);
};
