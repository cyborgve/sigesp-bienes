import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRetornoRoutingModule } from './singular-retorno-routing.module';
import { SingularRetornoComponent } from './singular-retorno.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
