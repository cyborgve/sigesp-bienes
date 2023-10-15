import { TipoFechaReferencia } from '@core/types/tipo-fecha';
import { TipoRangoFecha } from '@core/types/tipo-rango-fecha';

export interface RangoFecha {
  rango: TipoRangoFecha;
  fechaInicio: Date;
  fechaFin: Date;
  fechaReferencia: TipoFechaReferencia;
}
