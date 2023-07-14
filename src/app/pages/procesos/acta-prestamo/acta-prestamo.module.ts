import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActaPrestamoRoutingModule } from './acta-prestamo-routing.module';
import { ActaPrestamoComponent } from './acta-prestamo.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorUnidadAdministrativaModule } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { MatTableModule } from '@angular/material/table';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';

@NgModule({
  declarations: [ActaPrestamoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActaPrestamoRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    BuscadorUnidadAdministrativaModule,
    BuscadorActivoModule,
  ],
})
export class ActaPrestamoModule {}
