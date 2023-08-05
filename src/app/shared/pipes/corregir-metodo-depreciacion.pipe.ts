import { Pipe, PipeTransform } from '@angular/core';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';

@Pipe({
  name: 'corregirMetodoDepreciacion',
})
export class CorregirMetodoDepreciacionPipe implements PipeTransform {
  transform(value: string): string {
    return METODOS_DEPRECIACION.find(md => md.substring(0, 3) === value);
  }
}
