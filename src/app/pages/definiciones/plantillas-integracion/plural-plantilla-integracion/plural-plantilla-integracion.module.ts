import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralPlantillaIntegracionRoutingModule } from './plural-plantilla-integracion-routing.module';
import { PluralPlantillaIntegracionComponent } from './plural-plantilla-integracion.component';

@NgModule({
  declarations: [PluralPlantillaIntegracionComponent],
  imports: [CommonModule, PluralPlantillaIntegracionRoutingModule],
})
export class PluralPlantillaIntegracionModule {}
