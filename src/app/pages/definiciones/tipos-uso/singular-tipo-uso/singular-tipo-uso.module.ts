import { BuscadorTipoUsoModule } from './../buscador-tipo-uso/buscador-tipo-uso.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoUsoRoutingModule } from './singular-tipo-uso-routing.module';
import { SingularTipoUsoComponent } from './singular-tipo-uso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

@NgModule({
  declarations: [SingularTipoUsoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SingularTipoUsoRoutingModule,
    BuscadorTipoUsoModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoUsoModule {}
