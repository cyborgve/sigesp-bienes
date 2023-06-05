import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCausaMovimientoRoutingModule } from './singular-causa-movimiento-routing.module';
import { SingularCausaMovimientoComponent } from './singular-causa-movimiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorCausaMovimientoModule } from '../buscador-causa-movimiento/buscador-causa-movimiento.module';

@NgModule({
  declarations: [SingularCausaMovimientoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCausaMovimientoRoutingModule,
    BuscadorCausaMovimientoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularCausaMovimientoModule {}
