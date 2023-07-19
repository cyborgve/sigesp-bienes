import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRetornoRoutingModule } from './singular-retorno-routing.module';
import { SingularRetornoComponent } from './singular-retorno.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BuscadorRetornoModule } from '../buscador-retorno/buscador-retorno.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SingularRetornoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularRetornoRoutingModule,
    BuscadorRetornoModule,
    BuscadorActivoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class SingularRetornoModule {}
