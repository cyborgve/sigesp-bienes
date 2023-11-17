import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';

export const adaptarTipoCobertura = () => pipe(map(adaptar));
export const adaptarTiposCobertura = () =>
  pipe(map((tipoCoberturaes: any[]) => tipoCoberturaes.map(adaptar)));

const adaptar = (tipoCobertura: any) =>
  <TipoCobertura>{
    empresaId: Number(tipoCobertura.empresaId),
    id: Number(tipoCobertura.id),
    codigo: tipoCobertura.codigo,
    denominacion: tipoCobertura.denominacion,
    creado: tipoCobertura.creado,
    modificado: tipoCobertura.modificado,
  };
