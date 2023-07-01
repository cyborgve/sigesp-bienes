import { Pipe, PipeTransform } from '@angular/core';
import { CORRELATIVOS } from '@core/constants/correlativos';

@Pipe({
  name: 'denominacionCorrelativo',
})
export class DenominacionCorrelativoPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      let result = CORRELATIVOS.find(c => c.tabla === value).nombre || value;
      return result;
    }
    return value;
  }
}
