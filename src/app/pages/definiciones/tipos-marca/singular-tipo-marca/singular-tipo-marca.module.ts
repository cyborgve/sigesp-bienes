import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoMarcaRoutingModule } from './singular-tipo-marca-routing.module';
import { SingularTipoMarcaComponent } from './singular-tipo-marca.component';
import { BuscadorTipoMarcaModule } from '../buscador-tipo-marca/buscador-tipo-marca.module';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingularTipoMarcaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoMarcaRoutingModule,
    BuscadorTipoMarcaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoMarcaModule {}
