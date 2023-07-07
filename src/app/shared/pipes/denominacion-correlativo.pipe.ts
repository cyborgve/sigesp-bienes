import { Pipe, PipeTransform } from '@angular/core';
import { CORRELATIVOS } from '@core/constants/correlativos';

@Pipe({
  name: 'denominacionCorrelativo',
})
export class DenominacionCorrelativoPipe implements PipeTransform {
  transform(value: string): string {
    let result = CORRELATIVOS.find(c => c.tabla === value);
    return result ? result.nombre : value;
  }
}
