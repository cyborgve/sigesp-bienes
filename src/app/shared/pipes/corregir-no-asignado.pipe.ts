import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirNoAsignado',
})
export class CorregirNoAsignadoPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'Seleccionar') return 'No asignado';
    if (value === '--') return 'No asignado';
    if (value === '---') return 'No asignado';
    return value;
  }
}
