import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CausaMovimientoRoutingModule } from './causa-movimiento-routing.module';
import { CausaMovimientoComponent } from './causa-movimiento.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CausaMovimientoComponent],
  imports: [
    CommonModule,
    CausaMovimientoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class CausaMovimientoModule {}
