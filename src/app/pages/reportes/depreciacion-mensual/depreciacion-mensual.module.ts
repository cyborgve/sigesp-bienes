import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciacionMensualRoutingModule } from './depreciacion-mensual-routing.module';
import { DepreciacionMensualComponent } from './depreciacion-mensual.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { TablaDepreciacionModule } from '@pages/procesos/depreciaciones/tabla-depreciacion/tabla-depreciacion.module';
import { SharedModule } from '@shared/shared.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [DepreciacionMensualComponent, DetalleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FiltrosReportesModule,
    TablaDepreciacionModule,
    DepreciacionMensualRoutingModule,
    MatCardModule,
    MatTableModule,
  ],
})
export class DepreciacionMensualModule {}
