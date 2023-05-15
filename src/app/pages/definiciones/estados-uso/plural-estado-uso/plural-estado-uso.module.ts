import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralEstadoUsoRoutingModule } from './plural-estado-uso-routing.module';
import { PluralEstadoUsoComponent } from './plural-estado-uso.component';

@NgModule({
  declarations: [PluralEstadoUsoComponent],
  imports: [CommonModule, PluralEstadoUsoRoutingModule],
})
export class PluralEstadoUsoModule {}
