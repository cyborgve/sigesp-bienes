import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralIncorporacionRoutingModule } from './plural-incorporacion-routing.module';
import { PluralIncorporacionComponent } from './plural-incorporacion.component';

@NgModule({
  declarations: [PluralIncorporacionComponent],
  imports: [CommonModule, PluralIncorporacionRoutingModule],
})
export class PluralIncorporacionModule {}
