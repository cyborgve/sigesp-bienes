import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularUnidadAdministrativaRoutingModule } from './singular-unidad-administrativa-routing.module';
import { SingularUnidadAdministrativaComponent } from './singular-unidad-administrativa.component';

@NgModule({
  declarations: [SingularUnidadAdministrativaComponent],
  imports: [CommonModule, SingularUnidadAdministrativaRoutingModule],
})
export class SingularUnidadAdministrativaModule {}
