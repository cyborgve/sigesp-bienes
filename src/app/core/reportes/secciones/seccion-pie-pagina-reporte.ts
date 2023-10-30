import { TipoProceso } from '@core/types/tipo-proceso';

export const seccionPiePaginaReporte = (
  proceso: any,
  tipoProceso: TipoProceso
) => {
  let resultado: any = {};
  switch (tipoProceso) {
    case 'ACTA DE PRÉSTAMO':
      resultado = actaPrestamo(proceso);
      break;
    case 'AUTORIZACIÓN DE SALIDA':
      resultado = autorizacionSalida(proceso);
      break;
    case 'CAMBIO DE RESPONSABLE':
      resultado = cambioResponsable(proceso);
      break;
    case 'DEPRECIACIÓN':
      resultado = firmasAutorizadas();
      break;
    case 'DESINCORPORACIÓN':
      resultado = firmasAutorizadas();
      break;
    case 'ENTREGA DE UNIDAD':
      resultado = entregaUnidad(proceso);
      break;
    case 'INCORPORACIÓN':
      resultado = firmasAutorizadas();
      break;
    case 'MODIFICACIÓN':
      resultado = firmasAutorizadas();
      break;
    case 'REASIGNACIÓN':
      resultado = reasignacion(proceso);
      break;
    case 'RETORNO':
      resultado = firmasAutorizadas();
      break;
  }
  resultado = { height: 80, margin: [20, 0, 20, 20], ...resultado };
  return resultado;
};

const actaPrestamo = (proceso: any) => ({
  columns: [
    {
      width: '33.333%',
      stack: [
        campoFirma(
          'Responsable Unidad Administrativa Cedente:',
          proceso.unidadCedenteResponsable
        ),
      ],
    },
    {
      width: '33.333%',
      stack: [
        campoFirma(
          'Responsable Unidad Administrativa Receptora',
          proceso.unidadReceptoraResponsable
        ),
      ],
    },
    {
      width: '33.333%',
      stack: [campoFirma('Testigo', proceso.testigo)],
    },
  ],
});

const autorizacionSalida = (proceso: any) => ({
  columns: [
    {
      width: '50%',
      stack: [campoFirma('Empresa Autorizada:', proceso.empresaAutorizada)],
    },
    {
      width: '50%',
      stack: [campoFirma('Persona Autorizada', proceso.personaAutorizada)],
    },
  ],
});

const cambioResponsable = (proceso: any) => ({
  columns: [
    {
      width: '50%',
      stack: [campoFirma('Responsable Actual:', proceso.responsableActual)],
    },
    {
      width: '50%',
      stack: [campoFirma('Nuevo Responsable', proceso.nuevoResponsable)],
    },
  ],
});

const entregaUnidad = (proceso: any) => ({
  columns: [
    {
      width: '50%',
      stack: campoFirma('Responsable Anterior', proceso.responsableAnterior),
    },
    {
      width: '50%',
      stack: campoFirma('Nuevo Responsable', proceso.nuevoResponsable),
    },
  ],
});

const reasignacion = (proceso: any) => ({
  columns: [
    {
      width: '50%',
      stack: [campoFirma('Responsable Primario:', proceso.responsablePrimario)],
    },
    {
      width: '50%',
      stack: [campoFirma('Responsable de Uso', proceso.responsableUso)],
    },
  ],
});

const firmasAutorizadas = () => ({
  columns: [
    {
      width: '25%',
      stack: [campoFirma2('Elaborado por')],
    },
    {
      width: '25%',
      stack: [campoFirma2('Verificado por')],
    },
    {
      width: '25%',
      stack: [campoFirma2('Aurotizado por')],
    },
    {
      width: '25%',
      stack: [campoFirma2('Aprobado por')],
    },
  ],
});

const campoFirma = (tituloFirma: string, textoFirma: string) => [
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

const campoFirma2 = (textoFirma: string) => [
  {
    text: '____________________',
    style: 'rayaFirmas',
  },
  {
    text: textoFirma,
    style: 'textoFirmas',
  },
];
