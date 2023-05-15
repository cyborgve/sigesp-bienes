import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralComponenteEstructuraRoutingModule } from './plural-componente-estructura-routing.module';
import { PluralComponenteEstructuraComponent } from './plural-componente-estructura.component';

@NgModule({
  declarations: [PluralComponenteEstructuraComponent],
  imports: [CommonModule, PluralComponenteEstructuraRoutingModule],
})
export class PluralComponenteEstructuraModule {}
