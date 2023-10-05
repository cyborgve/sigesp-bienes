import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ColorService } from '@core/services/definiciones/color.service';

@Pipe({
  name: 'denominacionColor',
})
export class DenominacionColorPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    if (value === null || value === undefined) return of('');
    return this._color
      .buscarPorId(value)
      .pipe(map(color => color['denominacion']));
  }
  constructor(private _color: ColorService) {}
}
