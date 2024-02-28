import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoSemovienteRoutingModule } from './singular-tipo-semoviente-routing.module';
import { SingularTipoSemovienteComponent } from './singular-tipo-semoviente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BuscadorTipoSemovienteModule } from '../buscador-tipo-semoviente/buscador-tipo-semoviente.module';

@NgModule({
  declarations: [SingularTipoSemovienteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoSemovienteRoutingModule,
    BuscadorTipoSemovienteModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoSemovienteModule {}
