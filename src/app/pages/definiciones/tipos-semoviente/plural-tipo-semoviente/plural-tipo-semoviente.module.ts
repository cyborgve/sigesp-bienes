import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoSemovienteRoutingModule } from './plural-tipo-semoviente-routing.module';
import { PluralTipoSemovienteComponent } from './plural-tipo-semoviente.component';
import { TablaTipoSemovienteModule } from '../tabla-tipo-semoviente/tabla-tipo-semoviente.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralTipoSemovienteComponent],
  imports: [
    CommonModule,
    PluralTipoSemovienteRoutingModule,
    TablaTipoSemovienteModule,
    SharedModule,
  ],
})
export class PluralTipoSemovienteModule {}
