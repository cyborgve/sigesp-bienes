import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaActasPrestamoRoutingModule } from './lista-actas-prestamo-routing.module';
import { ListaActasPrestamoComponent } from './lista-actas-prestamo.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TablaActaPrestamoModule } from '@pages/procesos/actas-prestamo/tabla-acta-prestamo/tabla-acta-prestamo.module';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [ListaActasPrestamoComponent, DetalleComponent],
  imports: [
    CommonModule,
    ListaActasPrestamoRoutingModule,
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
export class ListaActasPrestamoModule {}
