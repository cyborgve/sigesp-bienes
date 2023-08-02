import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'denominacionTipoActivo',
})
export class DenominacionTipoActivoPipe implements PipeTransform {
  transform(value: string): string {
    let result = null;
    switch (value.toLowerCase()) {
      case 'mue':
        result = 'MUEBLE';
        break;
      case 'inm':
        result = 'INMUEBLE';
        break;
      case 'sem':
        result = 'SEMOVIENTE';
        break;
      case 'veh':
        result = 'VEHICULO';
        break;
      case '':
        result = null;
        break;
      default:
        result = value;
    }
    return result;
  }
}
