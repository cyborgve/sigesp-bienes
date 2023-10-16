import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioActivosRoutingModule } from './inventario-activos-routing.module';
import { InventarioActivosComponent } from './inventario-activos.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [InventarioActivosComponent],
  imports: [
    CommonModule,
    InventarioActivosRoutingModule,
    MatCardModule,
    SharedModule,
  ],
})
export class InventarioActivosModule {}
