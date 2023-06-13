import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralRotulacionRoutingModule } from './plural-rotulacion-routing.module';
import { PluralRotulacionComponent } from './plural-rotulacion.component';
import { TablaRotulacionModule } from '../tabla-rotulacion/tabla-rotulacion.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralRotulacionComponent],
  imports: [
    CommonModule,
    PluralRotulacionRoutingModule,
    TablaRotulacionModule,
    SharedModule,
  ],
})
export class PluralRotulacionModule {}
