import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoCoberturaRoutingModule } from './plural-tipo-cobertura-routing.module';
import { PluralTipoCoberturaComponent } from './plural-tipo-cobertura.component';
import { TablaTipoCoberturaModule } from '../tabla-tipo-cobertura/tabla-tipo-cobertura.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralTipoCoberturaComponent],
  imports: [
    CommonModule,
    PluralTipoCoberturaRoutingModule,
    TablaTipoCoberturaModule,
    SharedModule,
  ],
})
export class PluralTipoCoberturaModule {}
