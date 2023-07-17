import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralDesincorporacionRoutingModule } from './plural-desincorporacion-routing.module';
import { PluralDesincorporacionComponent } from './plural-desincorporacion.component';
import { SharedModule } from '@shared/shared.module';
import { TablaDesincorporacionModule } from '../tabla-desincorporacion/tabla-desincorporacion.module';

@NgModule({
  declarations: [PluralDesincorporacionComponent],
  imports: [
    CommonModule,
    PluralDesincorporacionRoutingModule,
    TablaDesincorporacionModule,
    SharedModule,
  ],
})
export class PluralDesincorporacionModule {}
