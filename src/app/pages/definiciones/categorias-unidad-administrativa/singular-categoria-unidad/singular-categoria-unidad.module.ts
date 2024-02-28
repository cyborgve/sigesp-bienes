import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCategoriaUnidadRoutingModule } from './singular-categoria-unidad-routing.module';
import { SingularCategoriaUnidadComponent } from './singular-categoria-unidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BuscadorCategoriaUnidadModule } from '../buscador-categoria-unidad/buscador-categoria-unidad.module';

@NgModule({
  declarations: [SingularCategoriaUnidadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCategoriaUnidadRoutingModule,
    BuscadorCategoriaUnidadModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularCategoriaUnidadModule {}
