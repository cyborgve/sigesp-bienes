import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';

export const activoCentroCostosAsignado = (activoDetalle: ActivoDetalle) => {
  let { codigoCentroCostos } = activoDetalle;
  let comprobaciones = [
    codigoCentroCostos !== null,
    codigoCentroCostos !== '--',
    codigoCentroCostos !== '---',
  ];
  return comprobaciones.every(todo => todo);
};
