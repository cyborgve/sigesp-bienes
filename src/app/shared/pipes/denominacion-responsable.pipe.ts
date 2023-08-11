import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { MPersonal, SigespService } from 'sigesp';
import { Id } from '@core/types/id';
import { normalizarObjeto } from '@core/utils/funciones/normalizar-objetos';
import { adaptarResposables } from '@core/utils/adaptadores-rxjs.ts/adaptar-responsables';
import { Responsable } from '@core/models/otros-modulos/responsable';

@Pipe({
  name: 'denominacionResponsable',
})
export class DenominacionResponsablePipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return value
      ? this._sigesp.getPersonal('responsables').pipe(
          map((resultado: any) => resultado.data),
          adaptarResposables(),
          map(responsables =>
            responsables.find(responsable => responsable.id === value)
          ),
          map(responsable =>
            responsable
              ? `${responsable.rif} - ${responsable.nombre} ${responsable.apellido}`
              : undefined
          )
        )
      : undefined;
  }
  constructor(private _sigesp: SigespService) {}
}
