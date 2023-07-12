import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciacionMensualRoutingModule } from './depreciacion-mensual-routing.module';
import { DepreciacionMensualComponent } from './depreciacion-mensual.component';

@NgModule({
  declarations: [DepreciacionMensualComponent],
  imports: [CommonModule, DepreciacionMensualRoutingModule],
})
export class DepreciacionMensualModule {}
