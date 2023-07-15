import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularEntregaUnidadRoutingModule } from './singular-entrega-unidad-routing.module';
import { SingularEntregaUnidadComponent } from './singular-entrega-unidad.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorEntregaUnidadModule } from '../buscador-entrega-unidad/buscador-entrega-unidad.module';

@NgModule({
  declarations: [SingularEntregaUnidadComponent],
  imports: [
    CommonModule,
    SingularEntregaUnidadRoutingModule,
    BuscadorEntregaUnidadModule,
    BuscadorEntregaUnidadModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularEntregaUnidadModule {}
