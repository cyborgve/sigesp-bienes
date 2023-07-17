import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralEntregaUnidadRoutingModule } from './plural-entrega-unidad-routing.module';
import { PluralEntregaUnidadComponent } from './plural-entrega-unidad.component';
import { TablaEntregaUnidadModule } from '../tabla-entrega-unidad/tabla-entrega-unidad.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralEntregaUnidadComponent],
  imports: [
    CommonModule,
    PluralEntregaUnidadRoutingModule,
    TablaEntregaUnidadModule,
    SharedModule,
  ],
})
export class PluralEntregaUnidadModule {}
