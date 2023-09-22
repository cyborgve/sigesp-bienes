import { tap } from 'rxjs/operators';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { pipe } from 'rxjs';
import { TipoProceso } from '@core/types/tipo-proceso';

export const abrirReporteProceso = (
  _pdf: PDFService,
  tipoProceso: TipoProceso
) => pipe(tap((proceso: any) => _pdf.abrirReportePDF(proceso, tipoProceso)));
