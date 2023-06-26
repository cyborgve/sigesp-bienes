import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoMarca',
})
export class TipoMarcaPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'N' ? 'Nacional' : 'Internacional';
  }
}
