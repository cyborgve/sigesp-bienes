import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirPorDefecto',
})
export class CorregirPorDefectoPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'POR DEFECTO') return 'Seleccionar';
    return value;
  }
}
