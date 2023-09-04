import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirSeleccionar',
})
export class CorregirSeleccionarPipe implements PipeTransform {
  transform(value: string): string {
    if (value)
      return value === '---' ||
        value === '--' ||
        value.toLowerCase() === 'ninguno' ||
        value.toLowerCase() === 'ninguna'
        ? 'Seleccionar'
        : value;
  }
}
