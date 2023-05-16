import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoUsoRoutingModule } from './plural-tipo-uso-routing.module';
import { PluralTipoUsoComponent } from './plural-tipo-uso.component';

@NgModule({
  declarations: [PluralTipoUsoComponent],
  imports: [CommonModule, PluralTipoUsoRoutingModule],
})
export class PluralTipoUsoModule {}
