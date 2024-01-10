import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirCodigoRetorno',
})
export class CorregirCodigoRetornoPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 8) return value.split(',')[0];
    return value;
  }
}
