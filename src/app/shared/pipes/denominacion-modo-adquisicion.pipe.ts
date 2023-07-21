import { tipoOracion } from '@core/utils/funciones/tipo-oracion';
import { Pipe, PipeTransform } from '@angular/core';
import { MODOS_ADQUISICION } from '@core/constants/modos-adquisicion';

@Pipe({
  name: 'denominacionModoAdquisicion',
})
export class DenominacionModoAdquisicionPipe implements PipeTransform {
  transform(value: string): string {
    return value === '0'
      ? tipoOracion(MODOS_ADQUISICION[0][1])
      : tipoOracion(MODOS_ADQUISICION[1][1]);
  }
}
