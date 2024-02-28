import { BuscadorPropositoSemovienteModule } from './../buscador-proposito-semoviente/buscador-proposito-semoviente.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularPropositoSemovienteRoutingModule } from './singular-proposito-semoviente-routing.module';
import { SingularPropositoSemovienteComponent } from './singular-proposito-semoviente.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [SingularPropositoSemovienteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularPropositoSemovienteRoutingModule,
    BuscadorPropositoSemovienteModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SingularPropositoSemovienteModule {}
