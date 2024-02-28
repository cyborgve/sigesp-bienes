import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularDepreciacionRoutingModule } from './singular-depreciacion-routing.module';
import { SingularDepreciacionComponent } from './singular-depreciacion.component';
import { BuscadorDepreciacionModule } from '../buscador-depreciacion/buscador-depreciacion.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MatTableModule } from '@angular/material/table';

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
