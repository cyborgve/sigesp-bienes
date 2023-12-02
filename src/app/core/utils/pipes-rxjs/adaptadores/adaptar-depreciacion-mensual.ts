import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';
import { normalizarTipoActivo } from '@core/utils/funciones/normalizar-tipo-activo';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';

export const adaptarDepreciacionMensual = () => pipe(map(adaptar));
export const adaptarDepreciacionesMensuales = () =>
  pipe(map((depreciaciones: any[]) => depreciaciones.map(adaptar)));

const adaptar = (depreciacion: any) =>
  <ActivoListaDepreciacion>{
    fechaDepreciacion: depreciacion.fechaDepreciacion,
    codigo: String(depreciacion.codigo).substring(5),
    denominacion: depreciacion.denominacion,
    tipo: normalizarTipoActivo(depreciacion.tipo),
    identificador: depreciacion.identificador,
    valorInicial: depreciacion.valorInicial,
    valorRescate: depreciacion.valorRescate,
    montoDepreciar: depreciacion.montoDepreciar,
    metodoDepreciacion: normalizarMetodoDepreciacion(
      depreciacion.metodoDepreciacion
    ),
    depreciacionMensual: depreciacion.depreciacionMensual,
    depreciacionAnual: depreciacion.depreciacionAnual,
    depreciacionAcumulada: depreciacion.depreciacionAcumulada,
    valorContable: depreciacion.valorContable,
  };
