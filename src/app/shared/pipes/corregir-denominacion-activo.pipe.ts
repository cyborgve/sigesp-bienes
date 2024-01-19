import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirDenominacionActivo',
})
export class CorregirDenominacionActivoPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(',').length > 1 ? value.split(',')[1] : value;
  }
}
