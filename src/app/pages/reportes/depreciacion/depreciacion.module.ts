import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciacionRoutingModule } from './depreciacion-routing.module';
import { DepreciacionComponent } from './depreciacion.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DepreciacionComponent],
  imports: [CommonModule, DepreciacionRoutingModule, SharedModule],
})
export class DepreciacionModule {}
