import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoActivosRoutingModule } from './listado-activos-routing.module';
import { ListadoActivosComponent } from './listado-activos.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { DetalleComponent } from './detalle/detalle.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ListadoActivosComponent, DetalleComponent],
  imports: [
    CommonModule,
    ListadoActivosRoutingModule,
    SharedModule,
    FiltrosReportesModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
  ],
})
export class ListadoActivosModule {}
