import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralSedeRoutingModule } from './plural-sede-routing.module';
import { PluralSedeComponent } from './plural-sede.component';

@NgModule({
  declarations: [PluralSedeComponent],
  imports: [CommonModule, PluralSedeRoutingModule],
})
export class PluralSedeModule {}
