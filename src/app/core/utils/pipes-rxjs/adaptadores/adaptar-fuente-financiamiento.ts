import { map } from 'rxjs/operators';
import { FuenteFinanciamiento } from '@core/models/otros-modulos/fuente-financiamiento';
import { pipe } from 'rxjs';
import { MFuenteFinanciamiento } from 'sigesp';

export const adaptarFuenteFinanciamiento = () => pipe(map(adaptar));
export const adaptarFuentesFinanciamiento = () =>
  pipe(map((fuentes: MFuenteFinanciamiento[]) => fuentes.map(adaptar)));

const adaptar = (fuente: any) =>
  <FuenteFinanciamiento>{
    empresaId: undefined,
    id: fuente['codigo'],
    codigo: fuente['codigoFuenteFinanciamiento'],
    denominacion: fuente.denominacionFuenteFinanciamiento,
    explicacion: fuente.explicacionFuenteFinanciamiento,
    creado: new Date(),
    modificado: new Date(),
  };
