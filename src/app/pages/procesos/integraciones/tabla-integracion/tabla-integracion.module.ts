import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaIntegracionComponent } from './tabla-integracion.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FiltrosReportesModule } from '@pages/reportes/filtros-reportes/filtros-reportes.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TablaIntegracionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    FiltrosReportesModule,
  ],
  exports: [TablaIntegracionComponent],
})
export class TablaIntegracionModule {}
