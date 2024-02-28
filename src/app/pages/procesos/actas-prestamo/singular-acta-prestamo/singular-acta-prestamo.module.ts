import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularActaPrestamoRoutingModule } from './singular-acta-prestamo-routing.module';
import { SingularActaPrestamoComponent } from './singular-acta-prestamo.component';
import { BuscadorActaPrestamoModule } from '../buscador-acta-prestamo/buscador-acta-prestamo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { BuscadorUnidadAdministrativaModule } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';

@NgModule({
  declarations: [SingularActaPrestamoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SingularActaPrestamoRoutingModule,
    BuscadorActaPrestamoModule,
    BuscadorUnidadAdministrativaModule,
    BuscadorActivoModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class SingularActaPrestamoModule {}
