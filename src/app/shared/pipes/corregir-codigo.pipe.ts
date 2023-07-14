import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirCodigo',
})
export class CorregirCodigoPipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(5);
  }
}
