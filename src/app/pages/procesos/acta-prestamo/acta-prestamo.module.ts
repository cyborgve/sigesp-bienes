import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActaPrestamoRoutingModule } from './acta-prestamo-routing.module';
import { ActaPrestamoComponent } from './acta-prestamo.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ActaPrestamoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActaPrestamoRoutingModule,
    SharedModule,
    MatCardModule,
  ],
})
export class ActaPrestamoModule {}
