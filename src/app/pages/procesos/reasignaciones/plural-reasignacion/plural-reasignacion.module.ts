import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralReasignacionRoutingModule } from './plural-reasignacion-routing.module';
import { PluralReasignacionComponent } from './plural-reasignacion.component';
import { SharedModule } from '@shared/shared.module';
import { TablaReasignacionModule } from '../tabla-reasignacion/tabla-reasignacion.module';

@NgModule({
  declarations: [PluralReasignacionComponent],
  imports: [
    CommonModule,
    PluralReasignacionRoutingModule,
    SharedModule,
    TablaReasignacionModule,
  ],
})
export class PluralReasignacionModule {}
