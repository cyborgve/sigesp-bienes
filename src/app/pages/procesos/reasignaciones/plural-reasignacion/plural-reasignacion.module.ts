import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralReasignacionRoutingModule } from './plural-reasignacion-routing.module';
import { PluralReasignacionComponent } from './plural-reasignacion.component';

@NgModule({
  declarations: [PluralReasignacionComponent],
  imports: [CommonModule, PluralReasignacionRoutingModule],
})
export class PluralReasignacionModule {}
