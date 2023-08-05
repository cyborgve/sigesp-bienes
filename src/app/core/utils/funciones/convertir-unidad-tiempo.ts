export function convertirUnidadTiempo(
  tiempoEntrada: number,
  unidadEntrada: string,
  unidadSalida: string
): number {
  const equivalentes = {
    MILISEGUNDOS: 1,
    SEGUNDOS: 1000,
    MINUTOS: 60000,
    HORAS: 3600000,
    DIAS: 86400000,
    SEMANAS: 604800000,
    MESES: 2629800000,
    AÑOS: 31557600000,
  };

  let equivalenteEntrada = equivalentes[unidadEntrada.toUpperCase()];
  let equivalenteSalida = equivalentes[unidadSalida.toUpperCase()];
  let factorConversion = equivalenteEntrada / equivalenteSalida;
  let resultado = tiempoEntrada * factorConversion;
  return resultado;
}
