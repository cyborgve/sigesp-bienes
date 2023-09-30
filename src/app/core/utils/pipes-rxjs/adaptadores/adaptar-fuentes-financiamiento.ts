import { map } from 'rxjs/operators';
import { FuenteFinanciamiento } from '@core/models/otros-modulos/fuente-financiamiento';
import { pipe } from 'rxjs';
import { MFuenteFinanciamiento } from 'sigesp';
export const adaptarFuentesFinanciamiento = () =>
  pipe(
    map((fuentes: MFuenteFinanciamiento[]) =>
      fuentes.map(
        fuente =>
          <FuenteFinanciamiento>{
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
