import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularEstadoUsoRoutingModule } from './singular-estado-uso-routing.module';
import { SingularEstadoUsoComponent } from './singular-estado-uso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorEstadoUsoModule } from '../buscador-estado-uso/buscador-estado-uso.module';

@NgModule({
  declarations: [SingularEstadoUsoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularEstadoUsoRoutingModule,
    BuscadorEstadoUsoModule,
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularEstadoUsoModule {}
