import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { MPersonal, SigespService } from 'sigesp';
import { Id } from '@core/types/id';

@Pipe({
  name: 'denominacionResponsable',
})
export class DenominacionResponsablePipe implements PipeTransform {
  transform(value: Id): Observable<string> {
    return this._sigesp.getPersonal('catalogo').pipe(
      map((personal: MPersonal[]) =>
        personal.find(persona => persona.idPersonal === value)
      ),
      map(
        persona =>
          `${persona.cedulaPersonal} - ${persona.nombrePersonal} ${persona.apellidoPersonal}`
      )
    );
  }
  constructor(private _sigesp: SigespService) {}
}
