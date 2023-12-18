import { Responsable } from '@core/models/otros-modulos/responsable';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarResponsable = () => pipe(map(adaptar));
export const adaptarResponsables = () =>
  pipe(map((responsables: any[]) => responsables.map(adaptar)));

const adaptar = (responsable: any) =>
  <Responsable>{
    empresaId: Number(responsable.empresaId),
    id: responsable.id,
    codigo: responsable.codigo,
    cedula: responsable.cedula,
    rif: responsable.rif,
    nombres: responsable.nombres,
    apellidos: responsable.apellidos,
    creado: responsable.creado,
    modificado: responsable.modificado,
  };
