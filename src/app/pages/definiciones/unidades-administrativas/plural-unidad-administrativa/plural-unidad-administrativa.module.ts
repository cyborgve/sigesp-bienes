import { TablaUnidadAdministrativaModule } from './../tabla-unidad-administrativa/tabla-unidad-administrativa.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralUnidadAdministrativaRoutingModule } from './plural-unidad-administrativa-routing.module';
import { PluralUnidadAdministrativaComponent } from './plural-unidad-administrativa.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralUnidadAdministrativaComponent],
  imports: [
    CommonModule,
    PluralUnidadAdministrativaRoutingModule,
    SharedModule,
    TablaUnidadAdministrativaModule,
  ],
})
export class PluralUnidadAdministrativaModule {}
