import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirTipoActivo',
})
export class CorregirTipoActivoPipe implements PipeTransform {
  private tiposActivo = {
    INM: 'Inmueble',
    MUE: 'Mueble',
    SEM: 'Semoviente',
    VEH: 'Vehículo',
    TIT: 'Titulo O Valores',
    ACC: 'Acciones O Participaciones',
  };

  transform(value: string): string {
    return this.tiposActivo[value];
  }
}
