import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';

@Pipe({
  name: 'corregirCodigo',
})
export class CorregirCodigoPipe implements PipeTransform {
  transform(value: Id): string {
    return value?.toString().toUpperCase() !== 'AUTOGENERADO'
      ? String(value).substring(5)
      : String(value);
  }
}
