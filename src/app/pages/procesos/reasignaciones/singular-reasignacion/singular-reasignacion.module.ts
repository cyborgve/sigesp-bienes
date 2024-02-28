import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularReasignacionRoutingModule } from './singular-reasignacion-routing.module';
import { SingularReasignacionComponent } from './singular-reasignacion.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorReasignacionModule } from '../buscador-reasignacion/buscador-reasignacion.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BuscadorCausaMovimientoModule } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.module';
import { BuscadorSedeModule } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.module';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [SingularReasignacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularReasignacionRoutingModule,
    BuscadorReasignacionModule,
    BuscadorCausaMovimientoModule,
    BuscadorSedeModule,
    BuscadorActivoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
})
export class SingularReasignacionModule {}
