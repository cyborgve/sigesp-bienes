import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';
import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';
import moment from 'moment';

/**
 * Calcula la depreciación acumulada de un activo después de cierto tiempo.
 * @param valorInicial El valor inicial del activo (el costo del activo).
 * @param vidaUtil El tiempo de vida útil del activo (en años o meses).
 * @param metodo El método de depreciación a utilizar.
 * @param tiempo El tiempo para el cual se calcula la depreciación acumulada (en años o meses).
 * @param enMeses Indica si el tiempo se proporciona en meses (por defecto es falso, si es true, se considera en meses).
 * @returns La depreciación acumulada después del tiempo especificado.
 */
export const calcularDepreciacion = (
  valorInicial: number,
  vidaUtil: number,
  metodo: MetodoDepreciacion,
  tiempo: number,
  enMeses: boolean = false,
  valorRescate: number,
  fechaAdquisicion?: Date
) => {
  // Si el tiempo se proporciona en meses, lo convertimos a años para un cálculo uniforme.
  const tiempoEnAnios = enMeses ? tiempo / 12 : tiempo;

  // Verifica si el tiempo es menor o igual a 0, en cuyo caso la depreciación es 0 ya que no ha comenzado la vida útil.
  if (tiempoEnAnios <= 0) {
    return 0;
  }

  // Verifica si el tiempo es mayor o igual a la vida útil, en cuyo caso la depreciación no puede superar el valor inicial.
  if (tiempoEnAnios >= vidaUtil) {
    return valorInicial;
  }

  // Selección del método de depreciación según el valor proporcionado en el parámetro "metodo".
  switch (metodo) {
    case 'LINEA RECTA':
      return calcularDepreciacionLineaRecta(
        valorInicial,
        vidaUtil,
        tiempoEnAnios
      );
    case 'SALDO DECRECIENTE':
      return calcularDepreciacionSaldoDecreciente(
        valorInicial,
        vidaUtil,
        tiempoEnAnios,
        valorRescate
      );
    case 'SUMA DE DIGITOS':
      return calcularDepreciacionSumaDigitos(
        valorInicial,
        vidaUtil,
        tiempoEnAnios
      );
    case 'UNIDADES DE PRODUCCION':
      return calcularDepreciacionUnidadesProduccion(
        valorInicial,
        vidaUtil,
        tiempoEnAnios
      );
    default:
      throw new Error('Método de depreciación no válido.');
  }
};

/**
 * Calcula la depreciación acumulada utilizando el método de línea recta.
 * @param valorInicial El valor inicial del activo (el costo del activo).
 * @param vidaUtil El tiempo de vida útil del activo en años (el período durante el cual se deprecia).
 * @param tiempo El tiempo para el cual se calcula la depreciación acumulada (en años).
 * @returns La depreciación acumulada después del tiempo especificado utilizando el método de línea recta.
 */
function calcularDepreciacionLineaRecta(
  valorInicial: number,
  vidaUtil: number,
  tiempo: number
): number {
  const depreciacionAnual = valorInicial / vidaUtil;
  return depreciacionAnual * tiempo;
}

/**
 * Calcula la depreciación acumulada utilizando el método de saldo decreciente.
 * @param valorInicial El valor inicial del activo (el costo del activo).
 * @param vidaUtil El tiempo de vida útil del activo en años (el período durante el cual se deprecia).
 * @param tiempo El tiempo para el cual se calcula la depreciación acumulada (en años).
 * @returns La depreciación acumulada después del tiempo especificado utilizando el método de saldo decreciente.
 */
function calcularDepreciacionSaldoDecreciente(
  valorInicial: number,
  vidaUtil: number,
  tiempo: number,
  valorRescate: number
): number {
  const tasaDepreciacion =
    1 - Math.pow(valorRescate / valorInicial, 1 / vidaUtil);
  let valorLibro = valorInicial;
  for (let i = 1; i <= tiempo; i++) {
    valorLibro -= valorLibro * tasaDepreciacion;
  }
  return valorInicial - valorLibro;
}

/**
 * Calcula la depreciación acumulada utilizando el método de suma de dígitos (Sum-of-the-Years' Digits).
 * @param valorInicial El valor inicial del activo (el costo del activo).
 * @param vidaUtil El tiempo de vida útil del activo en años (el período durante el cual se deprecia).
 * @param tiempo El tiempo para el cual se calcula la depreciación acumulada (en años).
 * @returns La depreciación acumulada después del tiempo especificado utilizando el método de suma de dígitos.
 */
function calcularDepreciacionSumaDigitos(
  valorInicial: number,
  vidaUtil: number,
  tiempo: number
): number {
  let sumaDigitos = (vidaUtil * (vidaUtil + 1)) / 2; // Calcula la suma de los dígitos de los años.
  let factor = (vidaUtil - tiempo + 1) / sumaDigitos; // Calcula el factor para el año específico.
  return valorInicial * factor;
}

/**
 * Calcula la depreciación acumulada utilizando el método de unidades de producción.
 * @param valorInicial El valor inicial del activo (el costo del activo).
 * @param vidaUtil El tiempo de vida útil del activo en años (el período durante el cual se deprecia).
 * @param tiempo El tiempo para el cual se calcula la depreciación acumulada (en años).
 * @returns La depreciación acumulada después del tiempo especificado utilizando el método de unidades de producción.
 */
function calcularDepreciacionUnidadesProduccion(
  valorInicial: number,
  vidaUtil: number,
  tiempo: number
): number {
  const totalUnidadesProducidas = 1000; // Total de unidades producidas durante toda la vida útil (ajustar según el caso)
  const unidadesProducidasEnAnoN = 200; // Unidades producidas en el año "tiempo" (ajustar según el caso)
  const depreciacionPorUnidad = valorInicial / totalUnidadesProducidas;
  return unidadesProducidasEnAnoN * depreciacionPorUnidad;
}

export function proyectarDepreciacion(
  valorInicial: number,
  vidaUtil: number,
  metodo: MetodoDepreciacion,
  enMeses: boolean = false,
  valorRescate: number,
  fechaAdquisicion?: Date
): DetalleDepreciacion[] {
  let detalleDepreciaciones: DetalleDepreciacion[] = [];
  let depreciacionAcumulada = 0;
  let valorContable = valorInicial;
  let fechaDepreciacionActual = fechaAdquisicion;

  for (let tiempo = 1; tiempo <= vidaUtil; tiempo++) {
    const meses = enMeses ? tiempo : tiempo * 12;
    const dias = enMeses ? tiempo * 30 : tiempo * 365; // Asumiendo 30 días por mes y 365 días por año
    const depreciacionMensual = calcularDepreciacion(
      valorInicial,
      vidaUtil,
      metodo,
      meses,
      enMeses,
      valorRescate
    );
    const depreciacionAnual = enMeses
      ? 0 // No aplica si se calcula en meses
      : calcularDepreciacion(
          valorInicial,
          vidaUtil,
          metodo,
          tiempo,
          false,
          valorRescate
        );

    depreciacionAcumulada += depreciacionMensual;
    valorContable -= depreciacionMensual;

    fechaDepreciacionActual = moment(fechaDepreciacionActual)
      .add(1, 'months')
      .toDate();

    let diasTranscurridos = moment(fechaDepreciacionActual).diff(
      moment(fechaAdquisicion),
      'days'
    );

    // Formatea la fecha de depreciación según tus preferencias
    const fechaDepreciacion = enMeses ? `Mes ${meses}` : `Año ${tiempo}`;

    detalleDepreciaciones.push({
      empresaId: undefined,
      id: undefined,
      proceso: undefined,
      fechaDepreciacion: fechaDepreciacionActual.toString(),
      depreciacionMensual: depreciacionMensual,
      depreciacionAnual: depreciacionAnual,
      dias: diasTranscurridos,
      meses: meses,
      depreciacionAcumulada: depreciacionAcumulada,
      valorContable: valorContable,
      creado: new Date(),
      modificado: new Date(),
    });
  }

  return detalleDepreciaciones;
}
