import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoSedeRoutingModule } from './plural-tipo-sede-routing.module';
import { PluralTipoSedeComponent } from './plural-tipo-sede.component';

@NgModule({
  declarations: [PluralTipoSedeComponent],
  imports: [CommonModule, PluralTipoSedeRoutingModule],
})
export class PluralTipoSedeModule {}
