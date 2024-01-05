import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { LineEnterprise } from '@core/models/otros-modulos/line-enterprise';

export const adaptarLineEnterprise = () => pipe(map(adaptar));
export const adaptarLinesEnterprise = () =>
  pipe(map((lines: any[]) => lines.map(adaptar)));

const adaptar = (lineEnterprise: any) =>
  <LineEnterprise>{
    empresaId: Number(lineEnterprise.idEmpresa),
    id: Number(lineEnterprise.idEnterprise),
    codigo: lineEnterprise.codigo,
    denominacion: lineEnterprise.denominacion,
    titulo: lineEnterprise.titulo,
    rif: lineEnterprise.rif,
    direccion: lineEnterprise.direccion,
    creado: lineEnterprise.creado || new Date(),
    modificado: lineEnterprise.modificado || new Date(),
  };
