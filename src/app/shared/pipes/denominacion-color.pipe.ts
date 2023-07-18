import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ColorService } from '@core/services/color.service';

@Pipe({
  name: 'denominacionColor',
})
export class DenominacionColorPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return value
      ? this._color
          .buscarPorId(value)
          .pipe(map(color => (color ? color['denominacion'] : String(value))))
      : of('no aplica');
  }
  constructor(private _color: ColorService) {}
}
