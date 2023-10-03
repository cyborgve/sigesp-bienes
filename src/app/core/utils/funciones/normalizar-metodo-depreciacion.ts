import { MetodoDepreciacion } from '@core/types/metodo-depreciacion';
export const normalizarMetodoDepreciacion = (metodoDepreciaicion: string) => {
  if (metodoDepreciaicion === 'LIN') return 'LINEA RECTA';
  else if (metodoDepreciaicion === 'SUM') return 'SUMA DE DIGITOS';
  else if (metodoDepreciaicion === 'SAL') return 'SALDO DECRECIENTE';
  else if (metodoDepreciaicion === 'UNI') return 'UNIDADES DE PRODUCCION';
  else if (metodoDepreciaicion === 'DIG') return 'DIGITOS DOBLES';
  else return metodoDepreciaicion;
};
