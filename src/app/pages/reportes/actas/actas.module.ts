import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActasRoutingModule } from './actas-routing.module';
import { ActasComponent } from './actas.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TablaActaPrestamoModule } from '@pages/procesos/actas-prestamo/tabla-acta-prestamo/tabla-acta-prestamo.module';
import { FiltrosReportesModule } from '@pages/reportes/filtros-reportes/filtros-reportes.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [ActasComponent, DetalleComponent],
  imports: [
    CommonModule,
    ActasRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TablaActaPrestamoModule,
    FiltrosReportesModule,
  ],
})
export class ActasModule {}
