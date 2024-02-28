import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularEstadoConservacionRoutingModule } from './singular-estado-conservacion-routing.module';
import { SingularEstadoConservacionComponent } from './singular-estado-conservacion.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import {
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
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
