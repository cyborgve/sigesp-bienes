import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoCoberturaRoutingModule } from './singular-tipo-cobertura-routing.module';
import { SingularTipoCoberturaComponent } from './singular-tipo-cobertura.component';

@NgModule({
  declarations: [SingularTipoCoberturaComponent],
  imports: [CommonModule, SingularTipoCoberturaRoutingModule],
})
export class SingularTipoCoberturaModule {}
