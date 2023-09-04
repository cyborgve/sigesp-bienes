import { BuscadorCatalogoGeneralModule } from '@pages/definiciones/catalogos-generales/buscador-catalogo-general/buscador-catalogo-general.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoActivosRoutingModule } from './listado-activos-routing.module';
import { ListadoActivosComponent } from './listado-activos.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaActivoModule } from '@pages/definiciones/activos/tabla-activo/tabla-activo.module';
import { FiltrosReportesModule } from '../filtros-reportes/filtros-reportes.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [ListadoActivosComponent],
  imports: [
    CommonModule,
    ListadoActivosRoutingModule,
    SharedModule,
    FiltrosReportesModule,
    MatCardModule,
    ReactiveFormsModule,
    TablaActivoModule,
    MatExpansionModule,
  ],
})
export class ListadoActivosModule {}
