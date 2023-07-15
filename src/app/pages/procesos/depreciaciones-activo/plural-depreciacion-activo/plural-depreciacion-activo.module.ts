import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralDepreciacionActivoRoutingModule } from './plural-depreciacion-activo-routing.module';
import { PluralDepreciacionActivoComponent } from './plural-depreciacion-activo.component';

@NgModule({
  declarations: [PluralDepreciacionActivoComponent],
  imports: [CommonModule, PluralDepreciacionActivoRoutingModule],
})
export class PluralDepreciacionActivoModule {}
