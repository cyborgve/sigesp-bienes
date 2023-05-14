import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCausaMovimientoRoutingModule } from './plural-causa-movimiento-routing.module';
import { PluralCausaMovimientoComponent } from './plural-causa-movimiento.component';
import { TablaCausaMovimientoModule } from '../tabla-causa-movimiento/tabla-causa-movimiento.module';

@NgModule({
  declarations: [PluralCausaMovimientoComponent],
  imports: [
    CommonModule,
    PluralCausaMovimientoRoutingModule,
    TablaCausaMovimientoModule,
  ],
})
export class PluralCausaMovimientoModule {}
