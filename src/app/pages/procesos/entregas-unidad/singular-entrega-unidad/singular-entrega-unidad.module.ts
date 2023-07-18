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
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorSedeModule } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.module';

@NgModule({
  declarations: [SingularEntregaUnidadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularEntregaUnidadRoutingModule,
    BuscadorEntregaUnidadModule,
    BuscadorEntregaUnidadModule,
    BuscadorSedeModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularEntregaUnidadModule {}
