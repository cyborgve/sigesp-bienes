import { map } from 'rxjs/operators';
import { Estado } from '@core/models/otros-modulos/estado';
import { pipe } from 'rxjs';

interface EstadoIn {
  codpai: string;
  codest: string;
  desest: string;
  ciucapest: string;
}

export const adaptarEstados = () =>
  pipe(
    map((res: any) => res.data as EstadoIn[]),
    map(estadosIn =>
      estadosIn.map(
        estadoIn =>
          <Estado>{
            empresaId: undefined,
            id:
              estadoIn.codest === '---'
                ? estadoIn.codest
                : estadoIn.codpai + '-' + estadoIn.codest,
            codigo: estadoIn.codest,
            paisId: estadoIn.codpai,
            capital: estadoIn.ciucapest,
            denominacion: estadoIn.desest,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
