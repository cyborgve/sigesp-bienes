import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularReasignacionRoutingModule } from './singular-reasignacion-routing.module';
import { SingularReasignacionComponent } from './singular-reasignacion.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
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
