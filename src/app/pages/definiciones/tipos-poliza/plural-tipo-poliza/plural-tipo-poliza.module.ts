import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoPolizaRoutingModule } from './plural-tipo-poliza-routing.module';
import { PluralTipoPolizaComponent } from './plural-tipo-poliza.component';

@NgModule({
  declarations: [PluralTipoPolizaComponent],
  imports: [CommonModule, PluralTipoPolizaRoutingModule],
})
export class PluralTipoPolizaModule {}
