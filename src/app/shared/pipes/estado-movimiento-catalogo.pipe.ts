import { Pipe, PipeTransform } from '@angular/core';
import { ESTADOS_MOVIMIENTO_CATALOGO } from '@core/constants/estado-movimiento-catalogo';

@Pipe({
  name: 'estadoMovimientoCatalogo',
})
export class EstadoMovimientoCatalogoPipe implements PipeTransform {
  transform(value: string): string {
    return ESTADOS_MOVIMIENTO_CATALOGO.find(
      emc => emc.substring(0, 1) === value
    );
  }
}
