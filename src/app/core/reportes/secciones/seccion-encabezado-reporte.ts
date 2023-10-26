import { Empresa } from '@core/models/otros-modulos/empresa';
import { TipoProceso } from '@core/types/tipo-proceso';
import { seccionEmpresaReporte } from './seccion-empresa-reporte';
import { seccionTituloReporte } from './seccion-titulo-reporte';

export const seccionEncabezadoReporte = (
  empresa: Empresa,
  proceso: any,
  tipoProceso: TipoProceso
) => ({
  columns: [
    {
      width: '50%',
      stack: seccionEmpresaReporte(empresa),
    },
    {
      width: '50%',
      stack: seccionTituloReporte(proceso, tipoProceso),
    },
  ],
});
