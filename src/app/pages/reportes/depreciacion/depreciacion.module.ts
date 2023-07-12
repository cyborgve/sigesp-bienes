import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciacionRoutingModule } from './depreciacion-routing.module';
import { DepreciacionComponent } from './depreciacion.component';

@NgModule({
  declarations: [DepreciacionComponent],
  imports: [CommonModule, DepreciacionRoutingModule],
})
export class DepreciacionModule {}
