import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaInventarioActivosRoutingModule } from './lista-inventario-activos-routing.module';
import { ListaInventarioActivosComponent } from './lista-inventario-activos.component';
import { SharedModule } from '@shared/shared.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';

@NgModule({
  declarations: [ListaInventarioActivosComponent, DetalleComponent],
  imports: [
    CommonModule,
    ListaInventarioActivosRoutingModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FiltrosReportesModule,
  ],
})
export class ListaInventarioActivosModule {}
