import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoCoberturaRoutingModule } from './singular-tipo-cobertura-routing.module';
import { SingularTipoCoberturaComponent } from './singular-tipo-cobertura.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BuscadorTipoCoberturaModule } from '../buscador-tipo-cobertura/buscador-tipo-cobertura.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

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
