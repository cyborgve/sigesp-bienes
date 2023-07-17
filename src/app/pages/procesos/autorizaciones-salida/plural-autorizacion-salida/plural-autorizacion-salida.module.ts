import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralAutorizacionSalidaRoutingModule } from './plural-autorizacion-salida-routing.module';
import { PluralAutorizacionSalidaComponent } from './plural-autorizacion-salida.component';
import { TablaAutorizacionSalidaModule } from '../tabla-autorizacion-salida/tabla-autorizacion-salida.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralAutorizacionSalidaComponent],
  imports: [
    CommonModule,
    PluralAutorizacionSalidaRoutingModule,
    TablaAutorizacionSalidaModule,
    SharedModule,
  ],
})
export class PluralAutorizacionSalidaModule {}
