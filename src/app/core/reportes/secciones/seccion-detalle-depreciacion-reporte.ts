export const seccionDetalleDepreciacionReporte = (proceso: any) => {
  let detalles = [
    [
      { text: 'Fecha Depreciación', alignment: 'center' },
      { text: 'Meses', alignment: 'center' },
      { text: 'Días', alignment: 'center' },
      { text: 'Depreciación Mensual', alignment: 'right' },
      { text: 'Depreciación Anual', alignment: 'right' },
      { text: 'Depreciación Acumulada', alignment: 'right' },
      { text: 'Valor Contable', alignment: 'right' },
    ],
  ];
  proceso.detalles.forEach(detalle =>
    detalles.push([
      {
        text: new Date(detalle.fecha).toLocaleDateString(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        alignment: 'center',
      },
      { text: Number(detalle.meses).toFixed(0), alignment: 'center' },
      { text: Number(detalle.dias).toFixed(0), alignment: 'center' },
      {
        text: Number(detalle.depreciacionMensual).toFixed(2),
        alignment: 'right',
      },
      {
        text: Number(detalle.depreciacionAnual).toFixed(2),
        alignment: 'right',
      },
      {
        text: Number(detalle.depreciacionAcumulada).toFixed(2),
        alignment: 'right',
      },
      {
        text: Number(detalle.valorContable).toFixed(2),
        alignment: 'right',
      },
    ])
  );

  return [
    {
      text: 'D E T A L L E S   D E P R E C I A C I O N',
      style: 'tituloDetalleReporte',
    },
    {
      table: {
        headerRows: 1,
        widths: ['14%', '10%', '10%', '16%', '16%', '17%', '17%'],
        body: detalles,
      },
      style: 'detalleReporte',
      layout: 'lightHorizontalLines',
    },
  ];
};
