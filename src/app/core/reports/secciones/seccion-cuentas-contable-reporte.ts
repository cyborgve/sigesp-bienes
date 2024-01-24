export const seccionCuentasContablesReporte = (cuentasContables: any[]) => [
  {
    text: 'C U E N T A S   C O N T A B L E S',
    style: 'tituloDetalleReporte',
  },
  {
    table: {
      headerRows: 1,
      widths: ['20%', '80%'],
      body: cuentasContables,
    },
    style: 'detalleReporte',
    layout: 'lightHorizontalLines',
  },
];
