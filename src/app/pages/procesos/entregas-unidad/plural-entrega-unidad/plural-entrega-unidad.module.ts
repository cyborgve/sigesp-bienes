import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralEntregaUnidadRoutingModule } from './plural-entrega-unidad-routing.module';
import { PluralEntregaUnidadComponent } from './plural-entrega-unidad.component';

@NgModule({
  declarations: [PluralEntregaUnidadComponent],
  imports: [CommonModule, PluralEntregaUnidadRoutingModule],
})
export class PluralEntregaUnidadModule {}
