import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoActivosRoutingModule } from './listado-activos-routing.module';
import { ListadoActivosComponent } from './listado-activos.component';

@NgModule({
  declarations: [ListadoActivosComponent],
  imports: [CommonModule, ListadoActivosRoutingModule],
})
export class ListadoActivosModule {}
