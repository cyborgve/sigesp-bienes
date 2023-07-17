import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirCodigo',
})
export class CorregirCodigoPipe implements PipeTransform {
  transform(value: string): string {
    if (value.toUpperCase() !== 'AUTOGENERADO') return value.substring(5);
    return value.toUpperCase();
  }
}
