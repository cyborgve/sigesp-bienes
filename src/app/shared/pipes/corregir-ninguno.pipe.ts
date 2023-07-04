import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirNinguno',
})
export class CorregirNingunoPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      if (value.toLowerCase() === 'ninguno') return 'Seleccionar';
    }
    return value;
  }
}
