import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaDepreciacionesMensualesRoutingModule } from './lista-depreciaciones-mensuales-routing.module';
import { ListaDepreciacionesMensualesComponent } from './lista-depreciaciones-mensuales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { TablaDepreciacionModule } from '@pages/procesos/depreciaciones/tabla-depreciacion/tabla-depreciacion.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ListaDepreciacionesMensualesComponent],
  imports: [
    CommonModule,
    ListaDepreciacionesMensualesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FiltrosReportesModule,
    TablaDepreciacionModule,
    MatTableModule,
    MatCardModule,
  ],
})
export class ListaDepreciacionesMensualesModule {}
