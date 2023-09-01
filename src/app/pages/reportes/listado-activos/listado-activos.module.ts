import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoActivosRoutingModule } from './listado-activos-routing.module';
import { ListadoActivosComponent } from './listado-activos.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaActivoModule } from '@pages/definiciones/activos/tabla-activo/tabla-activo.module';

@NgModule({
  declarations: [ListadoActivosComponent],
  imports: [
    CommonModule,
    ListadoActivosRoutingModule,
    SharedModule,
    MatCardModule,
    ReactiveFormsModule,
    TablaActivoModule,
  ],
})
export class ListadoActivosModule {}
