import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { MMoneda } from 'sigesp';
import { Moneda } from '@core/models/otros-modulos/moneda';
export const adaptarMonedas = () =>
  pipe(
    map((mmonedas: MMoneda[]) =>
      mmonedas.map(
        mmoneda =>
          <Moneda>{
            empresaId: undefined,
            id: mmoneda.codigo,
            codigo: mmoneda.codigo,
            denominacion: mmoneda.denominacion,
            iso: mmoneda.iso,
            simbolo: mmoneda.simbolo,
            decimales: mmoneda.decimales,
            separadorDecimal: mmoneda.separadorDecimal,
            separadorMiles: mmoneda.separadorMiles,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
