import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularUnidadAdministrativaRoutingModule } from './singular-unidad-administrativa-routing.module';
import { SingularUnidadAdministrativaComponent } from './singular-unidad-administrativa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorUnidadAdministrativaModule } from '../buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { SharedModule } from '@shared/shared.module';
import { BuscadorCategoriaUnidadModule } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad/buscador-categoria-unidad.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [SingularUnidadAdministrativaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularUnidadAdministrativaRoutingModule,
    BuscadorUnidadAdministrativaModule,
    BuscadorCategoriaUnidadModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularUnidadAdministrativaModule {}
