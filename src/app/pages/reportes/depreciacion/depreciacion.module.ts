import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciacionRoutingModule } from './depreciacion-routing.module';
import { DepreciacionComponent } from './depreciacion.component';
import { SharedModule } from '@shared/shared.module';
import { ComprobanteIncorporacionModule } from '@pages/procesos/incorporaciones/comprobante-incorporacion/comprobante-incorporacion.module';

@NgModule({
  declarations: [DepreciacionComponent],
  imports: [
    CommonModule,
    DepreciacionRoutingModule,
    SharedModule,
    ComprobanteIncorporacionModule,
  ],
})
export class DepreciacionModule {}
