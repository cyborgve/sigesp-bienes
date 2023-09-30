import { UnidadDeTiempo } from '@core/types/unidades-tiempo';
import moment from 'moment';

export const convertirUnidadTiempo = (
  tiempoEntrada: number,
  unidadEntrada: UnidadDeTiempo,
  unidadSalida: UnidadDeTiempo
) => {
  const equivalentes = {
    MILISEGUNDOS: 'millisoconds',
    SEGUNDOS: 'seconds',
    MINUTOS: 'minutes',
    HORAS: 'hours',
    DIAS: 'days',
    SEMANAS: 'weeks',
    MESES: 'months',
    AÑOS: 'years',
  };

  let equivalenteEntrada = equivalentes[unidadEntrada.toUpperCase()];
  let equivalenteSalida = equivalentes[unidadSalida.toUpperCase()];
  let resultado = moment
    .duration(tiempoEntrada, equivalenteEntrada)
    .as(equivalenteSalida);
  return resultado;
};
