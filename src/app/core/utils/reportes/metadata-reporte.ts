import { TipoProceso } from '@core/types/tipo-proceso';

export const metadataReporte = (
  proceso: any,
  tipoProceso: TipoProceso,
  usuarioActivo: any
) => ({
  title: `${tipoProceso}-${proceso.comprobante}`,
  subject: 'Comprobante de ejecucion de proceso',
  author: `${usuarioActivo.nombre} ${usuarioActivo.apellido}`,
  creator: 'Sigesp ERP - Bienes Nacionales',
});
