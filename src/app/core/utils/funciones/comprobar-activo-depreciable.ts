import { Activo } from '@core/models/definiciones/activo';

export const comprobarActivoDepreciable = (activoCompleto: Activo) => {
  let { valorAdquisicion, monedaId, fechaAdquisicion, depreciacion } =
    activoCompleto;
  let esDepreciable = [
    valorAdquisicion > 0,
    monedaId !== '---',
    fechaAdquisicion !== undefined,
    depreciacion.metodoDepreciacion !== undefined,
    depreciacion.vidaUtil > 0,
    depreciacion.cuentaContableDebe !== '---',
    depreciacion.cuentaContableHaber !== '---',
    depreciacion.depreciable !== 0,
    depreciacion.valorRescate > -1,
    depreciacion.monedaValorRescate !== '---',
  ];
  return esDepreciable.every(valor => !!valor);
};
