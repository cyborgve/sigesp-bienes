import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularModeloRoutingModule } from './singular-modelo-routing.module';
import { SingularModeloComponent } from './singular-modelo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorModeloModule } from '../buscador-modelo/buscador-modelo.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorMarcaModule } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.module';

@NgModule({
  declarations: [SingularModeloComponent],
  imports: [
    CommonModule,
    SingularModeloRoutingModule,
    BuscadorModeloModule,
    BuscadorMarcaModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ],
})
export class SingularModeloModule {}
