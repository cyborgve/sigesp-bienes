import { map } from 'rxjs/operators';
import { CentroCosto } from '@core/models/otros-modulos/centro-costo';
import { pipe } from 'rxjs';
import { MCentroCosto } from 'sigesp';
export const adaptarCentrosCosto = () =>
  pipe(
    map((centrosCosto: MCentroCosto[]) =>
      centrosCosto.map(
        centroCosto =>
          <CentroCosto>{
            empresaId: centroCosto.idEmpresa,
            id: centroCosto.centro,
            codigo: Number(centroCosto.centro),
            denominacion: centroCosto.denominacion,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
