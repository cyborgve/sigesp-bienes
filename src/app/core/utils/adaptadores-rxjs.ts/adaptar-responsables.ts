import { Responsable } from '@core/models/otros-modulos/responsable';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
export const adaptarResposables = () =>
  pipe(
    map((responsables: any[]) =>
      responsables.map(
        responsable =>
          <Responsable>{
            empresaId: responsable.id_empresa,
            id: responsable.id_personal,
            codigo: responsable.codper,
            cedula: responsable.cedper,
            rif: responsable.rifper,
            nombre: responsable.nomper,
            apellido: responsable.apeper,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
