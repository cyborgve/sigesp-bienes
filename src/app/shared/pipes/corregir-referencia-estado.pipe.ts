import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirReferenciaEstado',
})
export class CorregirReferenciaEstadoPipe implements PipeTransform {
  transform(referencia: string): string {
    return referencia.split(',')[0];
  }
}
