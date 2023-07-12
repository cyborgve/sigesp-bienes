import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciacionActivoRoutingModule } from './depreciacion-activo-routing.module';
import { DepreciacionActivoComponent } from './depreciacion-activo.component';

@NgModule({
  declarations: [DepreciacionActivoComponent],
  imports: [CommonModule, DepreciacionActivoRoutingModule],
})
export class DepreciacionActivoModule {}
