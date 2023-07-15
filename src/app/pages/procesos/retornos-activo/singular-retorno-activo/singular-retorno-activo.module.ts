import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRetornoActivoRoutingModule } from './singular-retorno-activo-routing.module';
import { SingularRetornoActivoComponent } from './singular-retorno-activo.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorRetornoActivoModule } from '../buscador-retorno-activo/buscador-retorno-activo.module';

@NgModule({
  declarations: [SingularRetornoActivoComponent],
  imports: [
    CommonModule,
    SingularRetornoActivoRoutingModule,
    BuscadorRetornoActivoModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularRetornoActivoModule {}
