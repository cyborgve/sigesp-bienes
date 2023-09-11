import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirNoAsignado',
})
export class CorregirNoAsignadoPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'Seleccionar' || value === '---' ? 'No asignado' : value;
  }
}
