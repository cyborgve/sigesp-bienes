import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirNinguno',
})
export class CorregirNingunoPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      if (
        value.toLowerCase() === 'ninguno' ||
        value.toLowerCase() === 'ninguna'
      )
        return 'Seleccionar';
    }
    return value;
  }
}
