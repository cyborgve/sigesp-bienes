import { map } from 'rxjs/operators';
import { Estado } from '@core/models/otros-modulos/estado';
import { pipe } from 'rxjs';

interface EstadoIn {
  codpai: string;
  codest: string;
  desest: string;
  ciucapest: string;
}

export const adaptarEstado = () =>
  pipe(
    map((res: any) => res.data as EstadoIn[]),
    map(data => data[0] as EstadoIn),
    map(adaptar)
  );
export const adaptarEstados = () =>
  pipe(
    map((res: any) => res.data as EstadoIn[]),
    map(estadosIn => estadosIn.map(adaptar))
  );

const adaptar = estadoIn =>
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
  };
