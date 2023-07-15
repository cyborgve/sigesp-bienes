import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralActaPrestamoRoutingModule } from './plural-acta-prestamo-routing.module';
import { PluralActaPrestamoComponent } from './plural-acta-prestamo.component';
import { TablaActaPrestamoModule } from '../tabla-acta-prestamo/tabla-acta-prestamo.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralActaPrestamoComponent],
  imports: [
    CommonModule,
    SharedModule,
    PluralActaPrestamoRoutingModule,
    TablaActaPrestamoModule,
  ],
})
export class PluralActaPrestamoModule {}
