import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Moneda } from '@core/models/otros-modulos/moneda';

export const adaptarMoneda = () => pipe(map(adaptar));
export const adaptarMonedas = () =>
  pipe(map((monedas: any[]) => monedas.map(adaptar)));

const adaptar = (moneda: any) =>
  <Moneda>{
    empresaId: Number(moneda.idEmpresa),
    id: moneda.codigo,
    codigo: moneda.codigo,
    denominacion: moneda.denominacion,
    iso: moneda.iso,
    simbolo: moneda.simbolo,
    decimales: moneda.decimales,
    separadorDecimal: moneda.separadorDecimal,
    separadorMiles: moneda.separadorMiles,
    creado: new Date(),
    modificado: new Date(),
  };
