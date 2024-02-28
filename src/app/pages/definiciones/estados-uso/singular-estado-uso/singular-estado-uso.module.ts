import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularEstadoUsoRoutingModule } from './singular-estado-uso-routing.module';
import { SingularEstadoUsoComponent } from './singular-estado-uso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
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
