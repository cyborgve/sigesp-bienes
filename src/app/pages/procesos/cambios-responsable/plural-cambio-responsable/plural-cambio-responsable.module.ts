import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCambioResponsableRoutingModule } from './plural-cambio-responsable-routing.module';
import { PluralCambioResponsableComponent } from './plural-cambio-responsable.component';

@NgModule({
  declarations: [PluralCambioResponsableComponent],
  imports: [CommonModule, PluralCambioResponsableRoutingModule],
})
export class PluralCambioResponsableModule {}
