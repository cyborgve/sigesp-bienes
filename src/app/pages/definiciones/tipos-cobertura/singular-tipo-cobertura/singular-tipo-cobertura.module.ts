import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoCoberturaRoutingModule } from './singular-tipo-cobertura-routing.module';
import { SingularTipoCoberturaComponent } from './singular-tipo-cobertura.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorTipoCoberturaModule } from '../buscador-tipo-cobertura/buscador-tipo-cobertura.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SingularTipoCoberturaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoCoberturaRoutingModule,
    BuscadorTipoCoberturaModule,
    SharedModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class SingularTipoCoberturaModule {}
