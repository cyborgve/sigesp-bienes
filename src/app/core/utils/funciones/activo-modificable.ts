import { Activo } from '@core/models/definiciones/activo';

export const activoModificable = (activoCompleto: Activo) => {
  let { codigoCentroCostos } = activoCompleto.detalle;
  let { modCuentaContableDebe, modCuentaContableHaber } =
    activoCompleto.integracion;
  let comprobaciones = [
    codigoCentroCostos !== null,
    codigoCentroCostos !== '',
    codigoCentroCostos !== '--',
    codigoCentroCostos !== '---',
    modCuentaContableDebe !== null,
    modCuentaContableDebe !== '',
    modCuentaContableDebe !== '--',
    modCuentaContableDebe !== '---',
    modCuentaContableHaber !== null,
    modCuentaContableHaber !== '',
    modCuentaContableHaber !== '--',
    modCuentaContableHaber !== '---',
  ];
  return comprobaciones.every(todo => todo);
};
