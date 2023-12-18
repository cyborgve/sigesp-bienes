import { Pipe, PipeTransform } from '@angular/core';
import { TipoPlantillaIntegracion } from '@core/types/tipo-plantilla-integracion';

@Pipe({
  name: 'corregirTipoPlantillaIntegracion',
})
export class CorregirTipoPlantillaIntegracionPipe implements PipeTransform {
  transform(tipo: string): TipoPlantillaIntegracion {
    let tipoPlantilla = {
      DEP: 'DEPRECIACIÓN',
      DES: 'DESINCORPORACIÓN',
      MOD: 'MODIFICACIÓN',
    };
    return tipoPlantilla[tipo];
  }
}
