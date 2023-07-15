import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralAutorizacionSalidaRoutingModule } from './plural-autorizacion-salida-routing.module';
import { PluralAutorizacionSalidaComponent } from './plural-autorizacion-salida.component';

@NgModule({
  declarations: [PluralAutorizacionSalidaComponent],
  imports: [CommonModule, PluralAutorizacionSalidaRoutingModule],
})
export class PluralAutorizacionSalidaModule {}
