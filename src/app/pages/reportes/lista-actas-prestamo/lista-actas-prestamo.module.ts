import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaActasPrestamoRoutingModule } from './lista-actas-prestamo-routing.module';
import { ListaActasPrestamoComponent } from './lista-actas-prestamo.component';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
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
    TablaActaPrestamoModule,
    FiltrosReportesModule,
  ],
})
export class ListaActasPrestamoModule {}
