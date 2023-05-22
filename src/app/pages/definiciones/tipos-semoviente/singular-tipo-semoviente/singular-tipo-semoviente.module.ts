import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoSemovienteRoutingModule } from './singular-tipo-semoviente-routing.module';
import { SingularTipoSemovienteComponent } from './singular-tipo-semoviente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
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
