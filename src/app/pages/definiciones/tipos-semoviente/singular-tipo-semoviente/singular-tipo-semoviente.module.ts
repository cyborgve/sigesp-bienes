import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoSemovienteRoutingModule } from './singular-tipo-semoviente-routing.module';
import { SingularTipoSemovienteComponent } from './singular-tipo-semoviente.component';

@NgModule({
  declarations: [SingularTipoSemovienteComponent],
  imports: [CommonModule, SingularTipoSemovienteRoutingModule],
})
export class SingularTipoSemovienteModule {}
