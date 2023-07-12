import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizacionSalidaRoutingModule } from './autorizacion-salida-routing.module';
import { AutorizacionSalidaComponent } from './autorizacion-salida.component';

@NgModule({
  declarations: [AutorizacionSalidaComponent],
  imports: [CommonModule, AutorizacionSalidaRoutingModule],
})
export class AutorizacionSalidaModule {}
