import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaDepreciacionesAnualesRoutingModule } from './lista-depreciaciones-anuales-routing.module';
import { ListaDepreciacionesAnualesComponent } from './lista-depreciaciones-anuales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { TablaDepreciacionModule } from '@pages/procesos/depreciaciones/tabla-depreciacion/tabla-depreciacion.module';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

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
