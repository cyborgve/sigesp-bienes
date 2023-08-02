import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { ColorService } from '@core/services/definiciones/color.service';

@Pipe({
  name: 'denominacionColor',
})
export class DenominacionColorPipe implements PipeTransform {
  transform(value: number): Observable<string> {
    return this._color
      .buscarPorId(value)
      .pipe(map(color => (color ? color['denominacion'] : String(value))));
  }
  constructor(private _color: ColorService) {}
}
