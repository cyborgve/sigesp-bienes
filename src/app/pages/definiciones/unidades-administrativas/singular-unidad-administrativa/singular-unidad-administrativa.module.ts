import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularUnidadAdministrativaRoutingModule } from './singular-unidad-administrativa-routing.module';
import { SingularUnidadAdministrativaComponent } from './singular-unidad-administrativa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorUnidadAdministrativaModule } from '../buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { SharedModule } from '@shared/shared.module';
import { BuscadorCategoriaUnidadModule } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad/buscador-categoria-unidad.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

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
