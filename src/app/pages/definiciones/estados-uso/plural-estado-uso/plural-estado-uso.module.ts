import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralEstadoUsoRoutingModule } from './plural-estado-uso-routing.module';
import { PluralEstadoUsoComponent } from './plural-estado-uso.component';
import { TablaEstadoUsoModule } from '../tabla-estado-uso/tabla-estado-uso.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralEstadoUsoComponent],
  imports: [
    CommonModule,
    PluralEstadoUsoRoutingModule,
    TablaEstadoUsoModule,
    SharedModule,
  ],
})
export class PluralEstadoUsoModule {}
