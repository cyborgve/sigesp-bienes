import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularEstadoConservacionRoutingModule } from './singular-estado-conservacion-routing.module';
import { SingularEstadoConservacionComponent } from './singular-estado-conservacion.component';

@NgModule({
  declarations: [SingularEstadoConservacionComponent],
  imports: [CommonModule, SingularEstadoConservacionRoutingModule],
})
export class SingularEstadoConservacionModule {}
