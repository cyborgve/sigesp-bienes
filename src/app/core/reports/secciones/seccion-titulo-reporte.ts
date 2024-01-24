import { TipoProceso } from '@core/types/tipo-proceso';

export const seccionTituloReporte = (
  proceso: any,
  tipoProceso: TipoProceso
) => [
  {
    text: `${tipoProceso} N°${proceso.comprobante}`,
    style: 'tituloReporte',
  },
  {
    text: `Fecha de Emisión: ${new Date(proceso.creado).toLocaleDateString(
      undefined,
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    )}`,
    style: 'fechaReporte',
  },
];
