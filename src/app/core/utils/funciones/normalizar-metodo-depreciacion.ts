export const normalizarMetodoDepreciacion = (metodoDepreciaicion: string) => {
  let metodos = {
    LIN: 'Linea Recta',
    SUM: 'Suma de Dígitos',
    SAL: 'Saldo Decreciente',
    UNI: 'Unidades de Producción',
  };
  return metodos[metodoDepreciaicion];
};
