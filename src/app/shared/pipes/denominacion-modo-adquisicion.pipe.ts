import { convertirTipoOracion } from '@core/utils/funciones/convertir-tipo-oracion';
import { Pipe, PipeTransform } from '@angular/core';
import { MODOS_ADQUISICION } from '@core/constants/modos-adquisicion';

@Pipe({
  name: 'denominacionModoAdquisicion',
})
export class DenominacionModoAdquisicionPipe implements PipeTransform {
  transform(value: string): string {
    return value === '0'
      ? convertirTipoOracion(MODOS_ADQUISICION[0][1])
      : convertirTipoOracion(MODOS_ADQUISICION[1][1]);
  }
}
