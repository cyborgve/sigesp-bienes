import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';

export const normalizarMetodoDepreciacion = (metodoDepreciaicion: string) => {
  let metodos = {
    LIN: 'LINEA RECTA',
    SUM: 'SUMA DE DIGITOS',
    SAL: 'SALDO DECRECIENTE',
    UNI: 'UNIDADES DE PRODUCCION',
  };
  return metodos[metodoDepreciaicion] as MetodoDepreciacion;
};
