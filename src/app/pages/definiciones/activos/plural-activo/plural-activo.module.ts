import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralActivoRoutingModule } from './plural-activo-routing.module';
import { PluralActivoComponent } from './plural-activo.component';

@NgModule({
  declarations: [PluralActivoComponent],
  imports: [CommonModule, PluralActivoRoutingModule],
})
export class PluralActivoModule {}
