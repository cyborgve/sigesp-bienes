import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCausaMovimientoRoutingModule } from './singular-causa-movimiento-routing.module';
import { SingularCausaMovimientoComponent } from './singular-causa-movimiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SingularCausaMovimientoComponent],
  imports: [
    CommonModule,
    SingularCausaMovimientoRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class SingularCausaMovimientoModule {}
