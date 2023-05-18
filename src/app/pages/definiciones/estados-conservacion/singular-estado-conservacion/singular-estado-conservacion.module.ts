import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularEstadoConservacionRoutingModule } from './singular-estado-conservacion-routing.module';
import { SingularEstadoConservacionComponent } from './singular-estado-conservacion.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorEstadoConservacionModule } from '../buscador-estado-conservacion/buscador-estado-conservacion.module';

@NgModule({
  declarations: [SingularEstadoConservacionComponent],
  imports: [
    CommonModule,
    SingularEstadoConservacionRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    BuscadorEstadoConservacionModule,
  ],
})
export class SingularEstadoConservacionModule {}
