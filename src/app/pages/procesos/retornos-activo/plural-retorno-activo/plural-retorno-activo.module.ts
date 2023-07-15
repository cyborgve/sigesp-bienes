import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralRetornoActivoRoutingModule } from './plural-retorno-activo-routing.module';
import { PluralRetornoActivoComponent } from './plural-retorno-activo.component';

@NgModule({
  declarations: [PluralRetornoActivoComponent],
  imports: [CommonModule, PluralRetornoActivoRoutingModule],
})
export class PluralRetornoActivoModule {}
