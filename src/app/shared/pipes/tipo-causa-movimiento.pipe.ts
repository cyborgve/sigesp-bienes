import { Pipe, PipeTransform } from '@angular/core';
import { TIPOS_CAUSA_MOVIMIENTO } from '@core/constants/tipos-causa-movimiento';

@Pipe({
  name: 'tipoCausaMovimiento',
})
export class TipoCausaMovimientoPipe implements PipeTransform {
  transform(value: string): string {
    return TIPOS_CAUSA_MOVIMIENTO.find(
      cm => cm.charAt(0).toUpperCase() === value
    );
  }
}
