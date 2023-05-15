import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularPropositoSemovienteRoutingModule } from './singular-proposito-semoviente-routing.module';
import { SingularPropositoSemovienteComponent } from './singular-proposito-semoviente.component';

@NgModule({
  declarations: [SingularPropositoSemovienteComponent],
  imports: [CommonModule, SingularPropositoSemovienteRoutingModule],
})
export class SingularPropositoSemovienteModule {}
