import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';

export function activoDepreciable(activo: ActivoDepreciacion) {
  return (
    activo.metodoDepreciacion !== undefined &&
    activo.valorRescate > 0 &&
    activo.vidaUtil > 0
  );
}
