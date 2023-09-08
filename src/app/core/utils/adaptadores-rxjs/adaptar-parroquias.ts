import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Parroquia } from '@core/models/otros-modulos/parroquia';
import { Id } from '@core/types/id';

interface ParroquiaIn {
  codpai: Id;
  codest: Id;
  codmun: Id;
  codpar: Id;
  despar: string;
}

export const adaptarParroquias = () =>
  pipe(
    map((res: any) => res.data as ParroquiaIn[]),
    map(parroquiasIn =>
      parroquiasIn.map(
        parroquiaIn =>
          <Parroquia>{
            empresaId: undefined,
            id:
              parroquiaIn.codpar === '---'
                ? parroquiaIn.codpar
                : parroquiaIn.codpai +
                  '-' +
                  parroquiaIn.codest +
                  '-' +
                  parroquiaIn.codmun +
                  '-' +
                  parroquiaIn.codpar,
            municipioId:
              parroquiaIn.codpai +
              '-' +
              parroquiaIn.codest +
              '-' +
              parroquiaIn.codmun,
            estadoId: parroquiaIn.codest,
            paisId: parroquiaIn.codpai,
            codigo: parroquiaIn.codpar,
            denominacion: parroquiaIn.despar,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
