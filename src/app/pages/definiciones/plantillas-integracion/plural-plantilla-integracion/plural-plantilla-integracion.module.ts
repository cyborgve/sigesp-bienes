import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralPlantillaIntegracionRoutingModule } from './plural-plantilla-integracion-routing.module';
import { PluralPlantillaIntegracionComponent } from './plural-plantilla-integracion.component';
import { TablaPlantillaIntegracionModule } from '../tabla-plantilla-integracion/tabla-plantilla-integracion.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralPlantillaIntegracionComponent],
  imports: [
    CommonModule,
    PluralPlantillaIntegracionRoutingModule,
    SharedModule,
    TablaPlantillaIntegracionModule,
  ],
})
export class PluralPlantillaIntegracionModule {}
