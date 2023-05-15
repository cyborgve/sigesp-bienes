import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralColorRoutingModule } from './plural-color-routing.module';
import { PluralColorComponent } from './plural-color.component';

@NgModule({
  declarations: [PluralColorComponent],
  imports: [CommonModule, PluralColorRoutingModule],
})
export class PluralColorModule {}
