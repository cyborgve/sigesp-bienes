import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirSeleccionar',
})
export class CorregirSeleccionarPipe implements PipeTransform {
  transform(value: string): string {
    if (value)
      return value === '000' ||
        value === '---' ||
        value === '--' ||
        value.toLowerCase() === 'ninguno' ||
        value.toLowerCase() === 'ninguna' ||
        value.toLowerCase() === 'por defecto'
        ? 'Seleccionar'
        : value;
  }
}
