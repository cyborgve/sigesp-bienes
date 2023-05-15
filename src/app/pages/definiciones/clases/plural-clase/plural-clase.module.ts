import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralClaseRoutingModule } from './plural-clase-routing.module';
import { PluralClaseComponent } from './plural-clase.component';

@NgModule({
  declarations: [PluralClaseComponent],
  imports: [CommonModule, PluralClaseRoutingModule],
})
export class PluralClaseModule {}
