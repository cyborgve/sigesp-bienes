import { map } from 'rxjs/operators';
import { FuenteFinanciemiento } from '@core/models/otros-modulos/fuente-financiemiento';
import { pipe } from 'rxjs';
import { MFuenteFinanciamiento } from 'sigesp';
export const adaptarFuentesFinanciemiento = () =>
  pipe(
    map((fuentes: MFuenteFinanciamiento[]) =>
      fuentes.map(
        fuente =>
          <FuenteFinanciemiento>{
            empresaId: undefined,
            id: fuente['codigo'],
            codigo: fuente['codigoFuenteFinanciamiento'],
            denominacion: fuente.denominacionFuenteFinanciamiento,
            explicacion: fuente.explicacionFuenteFinanciamiento,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
