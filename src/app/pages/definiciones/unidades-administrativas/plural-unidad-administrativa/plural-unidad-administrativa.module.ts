import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralUnidadAdministrativaRoutingModule } from './plural-unidad-administrativa-routing.module';
import { PluralUnidadAdministrativaComponent } from './plural-unidad-administrativa.component';

@NgModule({
  declarations: [PluralUnidadAdministrativaComponent],
  imports: [CommonModule, PluralUnidadAdministrativaRoutingModule],
})
export class PluralUnidadAdministrativaModule {}
