import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularPlantillaIntegracionRoutingModule } from './singular-plantilla-integracion-routing.module';
import { SingularPlantillaIntegracionComponent } from './singular-plantilla-integracion.component';

@NgModule({
  declarations: [SingularPlantillaIntegracionComponent],
  imports: [CommonModule, SingularPlantillaIntegracionRoutingModule],
})
export class SingularPlantillaIntegracionModule {}
