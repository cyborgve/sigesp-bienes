import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoUsoRoutingModule } from './singular-tipo-uso-routing.module';
import { SingularTipoUsoComponent } from './singular-tipo-uso.component';

@NgModule({
  declarations: [SingularTipoUsoComponent],
  imports: [CommonModule, SingularTipoUsoRoutingModule],
})
export class SingularTipoUsoModule {}
