import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralDesincorporacionRoutingModule } from './plural-desincorporacion-routing.module';
import { PluralDesincorporacionComponent } from './plural-desincorporacion.component';

@NgModule({
  declarations: [PluralDesincorporacionComponent],
  imports: [CommonModule, PluralDesincorporacionRoutingModule],
})
export class PluralDesincorporacionModule {}
