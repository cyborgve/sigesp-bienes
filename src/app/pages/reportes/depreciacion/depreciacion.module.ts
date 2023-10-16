import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciacionRoutingModule } from './depreciacion-routing.module';
import { DepreciacionComponent } from './depreciacion.component';
import { SharedModule } from '@shared/shared.module';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDepreciacionModule } from '@pages/procesos/depreciaciones/tabla-depreciacion/tabla-depreciacion.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DepreciacionComponent, DetalleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DepreciacionRoutingModule,
    SharedModule,
    FiltrosReportesModule,
    TablaDepreciacionModule,
    MatTableModule,
    MatCardModule,
  ],
})
export class DepreciacionModule {}
