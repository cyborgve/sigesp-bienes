import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoCoberturaRoutingModule } from './plural-tipo-cobertura-routing.module';
import { PluralTipoCoberturaComponent } from './plural-tipo-cobertura.component';

@NgModule({
  declarations: [PluralTipoCoberturaComponent],
  imports: [CommonModule, PluralTipoCoberturaRoutingModule],
})
export class PluralTipoCoberturaModule {}
