import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralSeguroRoutingModule } from './plural-seguro-routing.module';
import { PluralSeguroComponent } from './plural-seguro.component';

@NgModule({
  declarations: [PluralSeguroComponent],
  imports: [CommonModule, PluralSeguroRoutingModule],
})
export class PluralSeguroModule {}
