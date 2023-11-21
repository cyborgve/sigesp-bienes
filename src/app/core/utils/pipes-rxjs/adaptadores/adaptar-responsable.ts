import { Responsable } from '@core/models/otros-modulos/responsable';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarResponsable = () => pipe(map(adaptar));
export const adaptarResponsables = () =>
  pipe(map((responsables: any[]) => responsables.map(adaptar)));

const adaptar = (responsable: any) =>
  <Responsable>{
    empresaId: Number(responsable.id_empresa),
    id: responsable.id_personal,
    codigo: responsable.codper,
    cedula: responsable.cedper,
    rif: responsable.rifper,
    nombre: responsable.nomper,
    apellido: responsable.apeper,
    creado: new Date(),
    modificado: new Date(),
  };
