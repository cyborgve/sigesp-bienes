import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralPropositoSemovienteRoutingModule } from './plural-proposito-semoviente-routing.module';
import { PluralPropositoSemovienteComponent } from './plural-proposito-semoviente.component';
import { SharedModule } from '@shared/shared.module';
import { TablaPropositoSemovienteModule } from '../tabla-proposito-semoviente/tabla-proposito-semoviente.module';

@NgModule({
  declarations: [PluralPropositoSemovienteComponent],
  imports: [
    CommonModule,
    PluralPropositoSemovienteRoutingModule,
    SharedModule,
    TablaPropositoSemovienteModule,
  ],
})
export class PluralPropositoSemovienteModule {}
