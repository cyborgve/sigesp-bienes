import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CambioResponsableRoutingModule } from './cambio-responsable-routing.module';
import { CambioResponsableComponent } from './cambio-responsable.component';

@NgModule({
  declarations: [CambioResponsableComponent],
  imports: [CommonModule, CambioResponsableRoutingModule],
})
export class CambioResponsableModule {}
