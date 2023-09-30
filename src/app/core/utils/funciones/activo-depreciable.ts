import { Activo } from '@core/models/definiciones/activo';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';

export const activoDepreciable = (
  activoParcial: Activo,
  activoDepreciacion: ActivoDepreciacion
) => {
  let esDepreciable = [
    activoParcial.valorAdquisicion > 0,
    activoParcial.monedaId !== '---',
    activoParcial.fechaAdquisicion !== undefined,
    activoDepreciacion.metodoDepreciacion !== undefined,
    activoDepreciacion.vidaUtil > 0,
    activoDepreciacion.cuentaContableGasto !== '---',
    activoDepreciacion.cuentaContableDepreciacion !== '---',
    activoDepreciacion.depreciable !== 0,
    activoDepreciacion.valorRescate > 0,
    activoDepreciacion.monedaValorRescate !== '---',
  ];
  return esDepreciable.every(valor => !!valor);
};
