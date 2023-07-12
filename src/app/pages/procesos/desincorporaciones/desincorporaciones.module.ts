import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesincorporacionesRoutingModule } from './desincorporaciones-routing.module';
import { DesincorporacionesComponent } from './desincorporaciones.component';

@NgModule({
  declarations: [DesincorporacionesComponent],
  imports: [CommonModule, DesincorporacionesRoutingModule],
})
export class DesincorporacionesModule {}
