import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncorporacionesRoutingModule } from './incorporaciones-routing.module';
import { IncorporacionesComponent } from './incorporaciones.component';

@NgModule({
  declarations: [IncorporacionesComponent],
  imports: [CommonModule, IncorporacionesRoutingModule],
})
export class IncorporacionesModule {}
