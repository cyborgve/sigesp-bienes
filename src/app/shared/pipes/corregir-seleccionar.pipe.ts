import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirSeleccionar',
})
export class CorregirSeleccionarPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '---' || value === '--') return 'seleccionar';
    return value;
  }
}
