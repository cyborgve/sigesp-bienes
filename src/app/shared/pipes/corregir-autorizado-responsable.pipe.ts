import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirAutorizadoResponsable',
})
export class CorregirAutorizadoResponsablePipe implements PipeTransform {
  transform(value: string): string {
    return value.split(',')[0];
  }
}
