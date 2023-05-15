import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralOrigenRoutingModule } from './plural-origen-routing.module';
import { PluralOrigenComponent } from './plural-origen.component';

@NgModule({
  declarations: [PluralOrigenComponent],
  imports: [CommonModule, PluralOrigenRoutingModule],
})
export class PluralOrigenModule {}
