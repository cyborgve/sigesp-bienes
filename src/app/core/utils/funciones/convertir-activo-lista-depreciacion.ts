import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { normalizarMetodoDepreciacion } from './normalizar-metodo-depreciacion';

/**
 * Convierte los datos de un objeto Depreciacion y valores calculados en un objeto ActivoListaDepreciacion.
 *
 * @param depreciacion - El objeto Depreciacion que contiene información de la depreciación.
 * @param calculados - Un objeto con valores calculados necesarios para ActivoListaDepreciacion.
 * @param activo - Un objeto con información sobre el activo asociado a la depreciación.
 * @returns Un objeto ActivoListaDepreciacion con los datos combinados.
 */
export const convertirActivoListaDepreciacion = (
  depreciacion: Depreciacion,
  calculados: {
    fechaDepreciacion: Date;
    depreciacionMensual: number;
    depreciacionAnual: number;
    depreciacionAcumulada: number;
    valorContable: number;
  },
  activo: {
    codigo: string;
    denominacion: string;
    tipoActivo: string;
  }
) =>
  <ActivoListaDepreciacion>{
    fechaDepreciacion: new Date(
      calculados.fechaDepreciacion
    ).toLocaleDateString(),
    codigo: activo.codigo,
    denominacion: activo.denominacion,
    tipo: activo.tipoActivo,
    identificador: depreciacion.identificador,
    valorInicial: depreciacion.costo.toFixed(2),
    valorRescate: depreciacion.valorRescate.toFixed(2),
    montoDepreciar: depreciacion.montoDepreciar.toFixed(2),
    metodoDepreciacion: normalizarMetodoDepreciacion(depreciacion.metodo),
    depreciacionMensual: calculados.depreciacionMensual.toFixed(2),
    depreciacionAnual: calculados.depreciacionAnual.toFixed(2),
    depreciacionAcumulada: calculados.depreciacionAcumulada.toFixed(2),
    valorContable: calculados.valorContable.toFixed(2),
  };
