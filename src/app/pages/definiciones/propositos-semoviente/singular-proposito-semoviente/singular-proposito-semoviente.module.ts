import { BuscadorPropositoSemovienteModule } from './../buscador-proposito-semoviente/buscador-proposito-semoviente.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularPropositoSemovienteRoutingModule } from './singular-proposito-semoviente-routing.module';
import { SingularPropositoSemovienteComponent } from './singular-proposito-semoviente.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
