import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Moneda } from '@core/models/otros-modulos/moneda';

export const adaptarMoneda = () => pipe(map(adaptar));
export const adaptarMonedas = () =>
  pipe(map((monedas: any[]) => monedas.map(adaptar)));

const adaptar = (moneda: any) =>
  <Moneda>{
    empresaId: undefined,
    id: Number(moneda.id),
    codigo: moneda.codigo,
    denominacion: moneda.denominacion,
    iso: moneda.iso,
    simbolo: moneda.simbolo,
    creado: moneda.creado,
    modificado: moneda.modificado,
  };
