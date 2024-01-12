import { Activo } from '@core/models/definiciones/activo';

export const activoMonedaAsignada = (activo: Activo) => {
  let { monedaId } = activo;
  let comprobaciones = [monedaId !== null, monedaId !== '0'];
  return comprobaciones.every(todo => todo);
};
