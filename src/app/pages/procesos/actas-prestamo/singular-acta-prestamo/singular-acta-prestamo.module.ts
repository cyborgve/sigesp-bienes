import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularActaPrestamoRoutingModule } from './singular-acta-prestamo-routing.module';
import { SingularActaPrestamoComponent } from './singular-acta-prestamo.component';
import { BuscadorActaPrestamoModule } from '../buscador-acta-prestamo/buscador-acta-prestamo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
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
    MatTableModule,
  ],
})
export class SingularActaPrestamoModule {}
