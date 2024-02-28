import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaDepreciacionesRoutingModule } from './lista-depreciaciones-routing.module';
import { ListaDepreciacionesComponent } from './lista-depreciaciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { TablaDepreciacionModule } from '@pages/procesos/depreciaciones/tabla-depreciacion/tabla-depreciacion.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [ListaDepreciacionesComponent, DetalleComponent],
  imports: [
    CommonModule,
    ListaDepreciacionesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FiltrosReportesModule,
    TablaDepreciacionModule,
    MatTableModule,
    MatCardModule,
  ],
})
export class ListaDepreciacionesModule {}
