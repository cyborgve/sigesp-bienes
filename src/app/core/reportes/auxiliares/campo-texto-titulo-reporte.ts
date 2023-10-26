import { estilosProcesoReporte } from './estilos-proceso-reporte';

export const campoTextoConTituloReporte = (titulo: string, texto: string) => ({
  columns: [
    {
      width: 'auto',
      margin: [0, 0, 3, 0],
      stack: [
        {
          text: titulo,
          style: 'tituloDatosGeneralesReporte',
        },
      ],
    },
    {
      width: 'auto',
      stack: [
        {
          text: texto,
          style: 'datosGeneralesReporte',
        },
      ],
    },
  ],
  styles: estilosProcesoReporte(),
});
