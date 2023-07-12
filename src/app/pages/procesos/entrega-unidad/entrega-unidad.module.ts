import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregaUnidadRoutingModule } from './entrega-unidad-routing.module';
import { EntregaUnidadComponent } from './entrega-unidad.component';

@NgModule({
  declarations: [EntregaUnidadComponent],
  imports: [CommonModule, EntregaUnidadRoutingModule],
})
export class EntregaUnidadModule {}
