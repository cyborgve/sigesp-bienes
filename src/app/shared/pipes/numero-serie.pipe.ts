import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroSerie',
})
export class NumeroSeriePipe implements PipeTransform {
  transform(value: number): string {
    return String(value).padStart(4, '0');
  }
}
