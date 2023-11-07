import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaActivosRoutingModule } from './lista-activos-routing.module';
import { ListaActivosComponent } from './lista-activos.component';
import { SharedModule } from '@shared/shared.module';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [ListaActivosComponent, DetalleComponent],
  imports: [
    CommonModule,
    ListaActivosRoutingModule,
    SharedModule,
    FiltrosReportesModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
  ],
})
export class ListaActivosModule {}
