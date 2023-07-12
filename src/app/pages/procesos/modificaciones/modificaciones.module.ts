import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificacionesRoutingModule } from './modificaciones-routing.module';
import { ModificacionesComponent } from './modificaciones.component';

@NgModule({
  declarations: [ModificacionesComponent],
  imports: [CommonModule, ModificacionesRoutingModule],
})
export class ModificacionesModule {}
