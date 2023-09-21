export const seccionDetalleReporte = (proceso: any) => {
  let activos = [
    [
      'Código',
      'Tipo',
      'Denominación',
      'Identificador',
      { text: 'Valor', alignment: 'right' },
    ],
  ];
  proceso.activos.forEach((activo: any) => {
    activos.push([
      activo.codigo,
      activo.tipoActivo,
      activo.denominacion,
      activo.identificador,
      { text: activo.valor, alignment: 'right' },
    ]);
  });

  let cuentasContables = [['Cuenta Contable', 'Denominación']];
  if (proceso.cuentasContables)
    proceso.cuentasContables.forEach(cuentaProceso =>
      cuentasContables.push([
        cuentaProceso.cuentaContable,
        cuentaProceso.denominacion,
      ])
    );

  return proceso.cuentasContables
    ? [
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
      ]
    : [
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
};
