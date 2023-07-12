import { Responsable } from '@core/models/otros-modulos/responsable';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { MPersonal, MProveedor } from 'sigesp';
export const adaptarResposables = () =>
  pipe(
    map((responsables: MPersonal[]) =>
      responsables.map(
        responsable =>
          <Responsable>{
            empresaId: responsable.idEmpresa,
            id: responsable.idPersonal,
            cedula: responsable.cedulaPersonal,
            nombre: responsable.nombrePersonal,
            apellido: responsable.apellidoPersonal,
            cargo: responsable.cargoOriginalPersonal,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
