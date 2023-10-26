export const campoFirmaReporte = (tituloFirma: string, textoFirma: string) => {
  return [
    {
      text: '____________________',
      style: 'rayaFirmas',
    },
    {
      text: tituloFirma,
      style: 'tituloFirmas',
    },
    {
      text: textoFirma,
      style: 'textoFirmas',
    },
  ];
};
