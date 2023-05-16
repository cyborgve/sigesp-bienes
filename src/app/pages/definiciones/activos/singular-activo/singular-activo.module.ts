import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularActivoRoutingModule } from './singular-activo-routing.module';
import { SingularActivoComponent } from './singular-activo.component';

@NgModule({
  declarations: [SingularActivoComponent],
  imports: [CommonModule, SingularActivoRoutingModule],
})
export class SingularActivoModule {}
