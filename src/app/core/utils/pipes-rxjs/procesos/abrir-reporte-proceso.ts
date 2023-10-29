import { tap, switchMap, map } from 'rxjs/operators';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { pipe } from 'rxjs';
import { TipoProceso } from '@core/types/tipo-proceso';

export const abrirReporteProceso = (
  _pdf: PDFService,
  tipoProceso: TipoProceso
) =>
  pipe(
    switchMap((proceso: any) =>
      _pdf.abrirReporte(proceso, tipoProceso).pipe(map(() => proceso))
    )
  );
