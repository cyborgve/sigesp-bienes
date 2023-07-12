import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReasignacionesRoutingModule } from './reasignaciones-routing.module';
import { ReasignacionesComponent } from './reasignaciones.component';

@NgModule({
  declarations: [ReasignacionesComponent],
  imports: [CommonModule, ReasignacionesRoutingModule],
})
export class ReasignacionesModule {}
