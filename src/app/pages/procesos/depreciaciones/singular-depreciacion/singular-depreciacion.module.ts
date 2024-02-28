import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularDepreciacionRoutingModule } from './singular-depreciacion-routing.module';
import { SingularDepreciacionComponent } from './singular-depreciacion.component';
import { BuscadorDepreciacionModule } from '../buscador-depreciacion/buscador-depreciacion.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

@NgModule({
  declarations: [SingularDepreciacionComponent, DetalleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularDepreciacionRoutingModule,
    BuscadorDepreciacionModule,
    BuscadorActivoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
  ],
})
export class SingularDepreciacionModule {}
