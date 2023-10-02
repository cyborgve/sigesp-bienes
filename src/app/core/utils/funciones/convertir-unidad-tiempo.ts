import { UnidadDeTiempo } from '@core/types/unidades-tiempo';
import moment from 'moment';

/**
 * Convierte un valor de tiempo de una unidad de tiempo de entrada a una unidad de tiempo de salida.
 *
 * @param {number} tiempoEntrada - El valor de tiempo que se va a convertir.
 * @param {UnidadDeTiempo} unidadEntrada - La unidad de tiempo de entrada (p. ej., 'SEGUNDOS').
 * @param {UnidadDeTiempo} unidadSalida - La unidad de tiempo de salida (p. ej., 'MINUTOS').
 * @returns {number} El valor de tiempo convertido a la unidad de tiempo de salida.
 */
export const convertirUnidadTiempo = (
  tiempoEntrada: number,
  unidadEntrada: UnidadDeTiempo,
  unidadSalida: UnidadDeTiempo
) => {
  /**
   * Un objeto que mapea nombres de unidades de tiempo en mayúsculas a sus equivalentes en minúsculas.
   * @type {Object.<string, string>}
   */
  const equivalentes = {
    MILISEGUNDOS: 'milliseconds',
    SEGUNDOS: 'seconds',
    MINUTOS: 'minutes',
    HORAS: 'hours',
    DIAS: 'days',
    SEMANAS: 'weeks',
    MESES: 'months',
    AÑOS: 'years',
  };

  /**
   * La unidad de tiempo equivalente de la unidad de entrada en minúsculas.
   * @type {string}
   */
  let equivalenteEntrada = equivalentes[unidadEntrada.toUpperCase()];

  /**
   * La unidad de tiempo equivalente de la unidad de salida en minúsculas.
   * @type {string}
   */
  let equivalenteSalida = equivalentes[unidadSalida.toUpperCase()];

  /**
   * El resultado de la conversión de tiempo.
   * @type {number}
   */
  let resultado = moment
    .duration(tiempoEntrada, equivalenteEntrada)
    .as(equivalenteSalida);

  return resultado;
};
