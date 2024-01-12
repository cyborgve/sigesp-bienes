import { Activo } from '@core/models/definiciones/activo';

export const activoDesincorporable = (activoCompleto: Activo) => {
  let { desCuentaContableDebe, desCuentaContableHaber } =
    activoCompleto.integracion;
  let { codigoCentroCostos } = activoCompleto.detalle;
  let comprobaciones = [
    codigoCentroCostos !== null,
    codigoCentroCostos !== '',
    codigoCentroCostos !== '--',
    codigoCentroCostos !== '---',
    desCuentaContableDebe !== null,
    desCuentaContableDebe !== '',
    desCuentaContableDebe !== '--',
    desCuentaContableDebe !== '---',
    desCuentaContableHaber !== null,
    desCuentaContableHaber !== '',
    desCuentaContableHaber !== '--',
    desCuentaContableHaber !== '---',
  ];
  return comprobaciones.every(todo => todo);
};
