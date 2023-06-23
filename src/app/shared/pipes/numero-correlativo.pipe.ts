import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroCorrelativo',
})
export class NumeroCorrelativoPipe implements PipeTransform {
  transform(value: number): string {
    return String(value).padStart(8, '0');
  }
}
