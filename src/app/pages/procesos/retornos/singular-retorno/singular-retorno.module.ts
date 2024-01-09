import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRetornoRoutingModule } from './singular-retorno-routing.module';
import { SingularRetornoComponent } from './singular-retorno.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { FiltrosReportesModule } from '@pages/reportes/filtros-reportes/filtros-reportes.module';
import { FiltrosIntegracionesModule } from '@pages/procesos/integraciones/filtros-integracion/filtros-integraciones.module';

@NgModule({
  declarations: [SingularRetornoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularRetornoRoutingModule,
    FiltrosReportesModule,
    FiltrosIntegracionesModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class SingularRetornoModule {}
