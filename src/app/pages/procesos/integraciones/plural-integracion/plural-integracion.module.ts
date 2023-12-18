import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralIntegracionRoutingModule } from './plural-integracion-routing.module';
import { PluralIntegracionComponent } from './plural-integracion.component';
import { TablaIntegracionModule } from '../tabla-integracion/tabla-integracion.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralIntegracionComponent],
  imports: [
    CommonModule,
    PluralIntegracionRoutingModule,
    SharedModule,
    TablaIntegracionModule,
  ],
})
export class PluralIntegracionModule {}
