import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralEstadoConservacionRoutingModule } from './plural-estado-conservacion-routing.module';
import { PluralEstadoConservacionComponent } from './plural-estado-conservacion.component';

@NgModule({
  declarations: [PluralEstadoConservacionComponent],
  imports: [CommonModule, PluralEstadoConservacionRoutingModule],
})
export class PluralEstadoConservacionModule {}
