import { Activo } from '@core/models/definiciones/activo';

export const comprobarActivoDepreciable = (activo: Activo) => {
  let { valorAdquisicion, monedaId, fechaAdquisicion, depreciacion } = activo;
  let esDepreciable = [
    valorAdquisicion > 0,
    monedaId !== '---',
    fechaAdquisicion !== undefined,
    depreciacion.metodoDepreciacion !== undefined,
    depreciacion.vidaUtil > 0,
    depreciacion.cuentaContableDebe !== '---',
    depreciacion.cuentaContableHaber !== '---',
    depreciacion.depreciable !== 0,
    depreciacion.valorRescate > 0,
    depreciacion.monedaValorRescate !== '---',
  ];
  return esDepreciable.every(valor => !!valor);
};
