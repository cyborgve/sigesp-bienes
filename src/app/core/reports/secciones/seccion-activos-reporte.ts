export const seccionActivosReporte = (activos: any[]) => [
  {
    text: 'B I E N E S',
    style: 'tituloDetalleReporte',
  },
  {
    table: {
      headerRows: 1,
      widths: ['8%', '12%', '50%', '15%', '15%'],
      body: activos,
    },
    style: 'detalleReporte',
    layout: 'lightHorizontalLines',
  },
];
