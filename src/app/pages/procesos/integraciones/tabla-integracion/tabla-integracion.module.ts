import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaIntegracionComponent } from './tabla-integracion.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { FiltrosReportesModule } from '@pages/reportes/filtros-reportes/filtros-reportes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltrosIntegracionesModule } from '../filtros-integracion/filtros-integraciones.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  declarations: [TablaIntegracionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDatepickerModule,
    FiltrosReportesModule,
    FiltrosIntegracionesModule,
  ],
  exports: [TablaIntegracionComponent],
})
export class TablaIntegracionModule {}
