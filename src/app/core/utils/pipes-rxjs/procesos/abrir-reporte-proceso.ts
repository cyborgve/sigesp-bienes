import { tap, switchMap, map } from 'rxjs/operators';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { pipe } from 'rxjs';
import { TipoProceso } from '@core/types/tipo-proceso';

export const abrirReporteProceso = (
  _pdf: PDFService,
  tipoProceso: TipoProceso
) =>
  pipe(
    switchMap((proceso: any) => {
      if (tipoProceso === 'ACTA DE PRÉSTAMO')
        return _pdf.abrirReporte(proceso).pipe(map(() => proceso));
      // tap((proceso: any) => {
      //   if (tipoProceso === 'ENTREGA DE UNIDAD')
      //     return _pdf.abrirReportePDFEntregaUnidad(proceso);
      //   else if (tipoProceso === 'ACTA DE PRÉSTAMO')
      //     return _pdf.abrirReportePDFActaPrestamo(proceso);
      //   else if (tipoProceso === 'MODIFICACIÓN')
      //     return _pdf.abrirReportePDFModificacion(proceso);
      //   else if (tipoProceso === 'DEPRECIACIÓN')
      //     return _pdf.abrirReportePDFDepreciacion(proceso);
      //   else return _pdf.abrirReportePDF(proceso, tipoProceso);
    })
  );
