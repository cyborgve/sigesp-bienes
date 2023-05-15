import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoEstructuraRoutingModule } from './singular-tipo-estructura-routing.module';
import { SingularTipoEstructuraComponent } from './singular-tipo-estructura.component';

@NgModule({
  declarations: [SingularTipoEstructuraComponent],
  imports: [CommonModule, SingularTipoEstructuraRoutingModule],
})
export class SingularTipoEstructuraModule {}
