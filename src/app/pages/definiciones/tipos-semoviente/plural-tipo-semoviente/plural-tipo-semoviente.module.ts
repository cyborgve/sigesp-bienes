import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoSemovienteRoutingModule } from './plural-tipo-semoviente-routing.module';
import { PluralTipoSemovienteComponent } from './plural-tipo-semoviente.component';

@NgModule({
  declarations: [PluralTipoSemovienteComponent],
  imports: [CommonModule, PluralTipoSemovienteRoutingModule],
})
export class PluralTipoSemovienteModule {}
