import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCambioResponsableRoutingModule } from './plural-cambio-responsable-routing.module';
import { PluralCambioResponsableComponent } from './plural-cambio-responsable.component';
import { TablaCambioResponsableModule } from '../tabla-cambio-responsable/tabla-cambio-responsable.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralCambioResponsableComponent],
  imports: [
    CommonModule,
    PluralCambioResponsableRoutingModule,
    TablaCambioResponsableModule,
    SharedModule,
  ],
})
export class PluralCambioResponsableModule {}
