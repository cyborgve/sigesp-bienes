import { map } from 'rxjs/operators';
import { Ciudad } from '@core/models/otros-modulos/ciudad';
import { Id } from '@core/types/id';
import { pipe } from 'rxjs';

interface CiudadIn {
  codpai: Id;
  codest: Id;
  codciu: Id;
  desciu: string;
}

export const adaptarCiudades = () =>
  pipe(
    map((res: any) => res.data as CiudadIn[]),
    map(ciudadesIn =>
      ciudadesIn.map(
        ciudadIn =>
          <Ciudad>{
            empresaId: undefined,
            paisId: ciudadIn.codpai,
            estadoId: ciudadIn.codpai + '-' + ciudadIn.codest,
            id:
              ciudadIn.codciu === '---'
                ? ciudadIn.codciu
                : ciudadIn.codpai +
                  '-' +
                  ciudadIn.codest +
                  '-' +
                  ciudadIn.codciu,
            denominacion: ciudadIn.desciu,
            codigo: ciudadIn.codciu,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
