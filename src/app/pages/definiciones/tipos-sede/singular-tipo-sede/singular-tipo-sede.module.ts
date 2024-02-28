import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoSedeRoutingModule } from './singular-tipo-sede-routing.module';
import { SingularTipoSedeComponent } from './singular-tipo-sede.component';
import { BuscadorTipoSedeModule } from '../buscador-tipo-sede/buscador-tipo-sede.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SingularTipoSedeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoSedeRoutingModule,
    BuscadorTipoSedeModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoSedeModule {}
