import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirSeleccionar',
})
export class CorregirSeleccionarPipe implements PipeTransform {
  transform(value: string): string {
    return value === '---' || value === '--' ? 'Seleccionar' : value;
  }
}
