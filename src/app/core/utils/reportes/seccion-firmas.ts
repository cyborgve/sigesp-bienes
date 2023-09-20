import { TipoProceso } from '@core/types/tipo-proceso';

export function seccionFirmas(proceso: any, tipoProceso: TipoProceso) {
  let resultado: any = {};
  switch (tipoProceso) {
    case 'ACTA DE PRÉSTAMO':
      resultado = actaPrestamo(proceso);
      break;
  }
  return resultado;
}

let actaPrestamo = (proceso: any) => ({
  height: 80,
  margin: [20, 0, 20, 20],
  columns: [
    {
      width: '33.333%',
      stack: [
        {
          text: '______________________________',
          style: 'rayaFirmas',
        },
        {
          text: 'Responsable Unidad Administrativa Cedente',
          style: 'tituloFirmas',
        },
        {
          text: proceso.unidadCedenteResponsable,
          style: 'textoFirmas',
        },
      ],
    },
    {
      width: '33.333%',
      stack: [
        {
          text: '______________________________',
          style: 'rayaFirmas',
        },
        {
          text: 'Responsable Unidad Administrativa Receptora',
          style: 'tituloFirmas',
        },
        {
          text: proceso.unidadReceptoraResponsable,
          style: 'textoFirmas',
        },
      ],
    },
    {
      width: '33.333%',
      stack: [
        {
          text: '______________________________',
          style: 'rayaFirmas',
        },
        {
          text: 'Testigo',
          style: 'tituloFirmas',
        },
        {
          text: proceso.testigo,
          style: 'textoFirmas',
        },
      ],
    },
  ],
});
