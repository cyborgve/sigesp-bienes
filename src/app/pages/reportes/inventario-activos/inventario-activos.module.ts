import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioActivosRoutingModule } from './inventario-activos-routing.module';
import { InventarioActivosComponent } from './inventario-activos.component';

@NgModule({
  declarations: [InventarioActivosComponent],
  imports: [CommonModule, InventarioActivosRoutingModule],
})
export class InventarioActivosModule {}
