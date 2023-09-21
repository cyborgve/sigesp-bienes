export const seccionDetallesModificacionReporte = (proceso: any) => {
  let componentes = [['Código', 'Tipo', 'Denominación']];
  proceso.modificaciones.forEach(componente =>
    componentes.push([
      String(componente.codigo).substring(5),
      componente.tipoComponente,
      componente.denominacion,
    ])
  );
  let cuentasContables = [['Cuenta Contable', 'Denominación']];
  proceso.cuentasContables.forEach(cuentaProceso =>
    cuentasContables.push([
      cuentaProceso.cuentaContable,
      cuentaProceso.denominacion,
    ])
  );
  return [
    {
      text: 'M O D I F I C A C I O N E S',
      style: 'tituloDetalleReporte',
    },
    {
      table: {
        headerRows: 1,
        widths: ['15%', '25%', '60%'],
        body: componentes,
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
  ];
};
