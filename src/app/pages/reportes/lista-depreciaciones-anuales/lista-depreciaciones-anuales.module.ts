import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaDepreciacionesAnualesRoutingModule } from './lista-depreciaciones-anuales-routing.module';
import { ListaDepreciacionesAnualesComponent } from './lista-depreciaciones-anuales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { TablaDepreciacionModule } from '@pages/procesos/depreciaciones/tabla-depreciacion/tabla-depreciacion.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ListaDepreciacionesAnualesComponent],
  imports: [
    CommonModule,
    ListaDepreciacionesAnualesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FiltrosReportesModule,
    TablaDepreciacionModule,
    MatTableModule,
    MatCardModule,
  ],
})
export class ListaDepreciacionesAnualesModule {}
