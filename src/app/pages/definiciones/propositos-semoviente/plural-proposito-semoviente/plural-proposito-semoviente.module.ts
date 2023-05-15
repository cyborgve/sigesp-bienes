import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralPropositoSemovienteRoutingModule } from './plural-proposito-semoviente-routing.module';
import { PluralPropositoSemovienteComponent } from './plural-proposito-semoviente.component';

@NgModule({
  declarations: [PluralPropositoSemovienteComponent],
  imports: [CommonModule, PluralPropositoSemovienteRoutingModule],
})
export class PluralPropositoSemovienteModule {}
