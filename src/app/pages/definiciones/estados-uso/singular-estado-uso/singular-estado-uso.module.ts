import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularEstadoUsoRoutingModule } from './singular-estado-uso-routing.module';
import { SingularEstadoUsoComponent } from './singular-estado-uso.component';

@NgModule({
  declarations: [SingularEstadoUsoComponent],
  imports: [CommonModule, SingularEstadoUsoRoutingModule],
})
export class SingularEstadoUsoModule {}
