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

@NgModule({
  declarations: [ActasComponent],
  imports: [
    CommonModule,
    ActasRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    TablaActaPrestamoModule,
    FiltrosReportesModule,
  ],
})
export class ActasModule {}
