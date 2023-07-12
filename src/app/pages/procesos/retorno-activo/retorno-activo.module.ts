import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetornoActivoRoutingModule } from './retorno-activo-routing.module';
import { RetornoActivoComponent } from './retorno-activo.component';

@NgModule({
  declarations: [RetornoActivoComponent],
  imports: [CommonModule, RetornoActivoRoutingModule],
})
export class RetornoActivoModule {}
