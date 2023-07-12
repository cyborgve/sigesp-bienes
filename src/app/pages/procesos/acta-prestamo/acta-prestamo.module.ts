import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActaPrestamoRoutingModule } from './acta-prestamo-routing.module';
import { ActaPrestamoComponent } from './acta-prestamo.component';

@NgModule({
  declarations: [ActaPrestamoComponent],
  imports: [CommonModule, ActaPrestamoRoutingModule],
})
export class ActaPrestamoModule {}
