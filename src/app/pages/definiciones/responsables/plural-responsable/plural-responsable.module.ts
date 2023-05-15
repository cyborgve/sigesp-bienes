import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralResponsableRoutingModule } from './plural-responsable-routing.module';
import { PluralResponsableComponent } from './plural-responsable.component';

@NgModule({
  declarations: [PluralResponsableComponent],
  imports: [CommonModule, PluralResponsableRoutingModule],
})
export class PluralResponsableModule {}
