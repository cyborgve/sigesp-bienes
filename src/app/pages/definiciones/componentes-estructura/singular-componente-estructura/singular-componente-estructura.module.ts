import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularComponenteEstructuraRoutingModule } from './singular-componente-estructura-routing.module';
import { SingularComponenteEstructuraComponent } from './singular-componente-estructura.component';

@NgModule({
  declarations: [SingularComponenteEstructuraComponent],
  imports: [CommonModule, SingularComponenteEstructuraRoutingModule],
})
export class SingularComponenteEstructuraModule {}
