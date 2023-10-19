import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { LineEnterprise } from '@core/models/otros-modulos/line-enterprise';

export const adaptarLineEnterprise = () =>
  pipe(
    map(
      (lineEnterprise: any) =>
        <LineEnterprise>{
          empresaId: Number(lineEnterprise.id_empresa),
          id: Number(lineEnterprise.id_enterprise),
          codigo: lineEnterprise.codigo,
          denominacion: lineEnterprise.denominacion,
          titulo: lineEnterprise.titulo,
          rif: lineEnterprise.rif,
          direccion: lineEnterprise.direccion,
          creado: lineEnterprise.creado,
          modificado: lineEnterprise.modificado,
        }
    )
  );
