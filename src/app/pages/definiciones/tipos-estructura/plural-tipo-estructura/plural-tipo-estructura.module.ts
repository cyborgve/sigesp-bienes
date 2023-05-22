import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoEstructuraRoutingModule } from './plural-tipo-estructura-routing.module';
import { PluralTipoEstructuraComponent } from './plural-tipo-estructura.component';
import { TablaTipoEstructuraModule } from '../tabla-tipo-estructura/tabla-tipo-estructura.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralTipoEstructuraComponent],
  imports: [
    CommonModule,
    PluralTipoEstructuraRoutingModule,
    TablaTipoEstructuraModule,
    SharedModule,
  ],
})
export class PluralTipoEstructuraModule {}
