import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoEstructuraRoutingModule } from './plural-tipo-estructura-routing.module';
import { PluralTipoEstructuraComponent } from './plural-tipo-estructura.component';

@NgModule({
  declarations: [PluralTipoEstructuraComponent],
  imports: [CommonModule, PluralTipoEstructuraRoutingModule],
})
export class PluralTipoEstructuraModule {}
