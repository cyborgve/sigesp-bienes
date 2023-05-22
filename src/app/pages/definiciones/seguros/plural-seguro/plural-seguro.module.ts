import { TablaSeguroModule } from './../tabla-seguro/tabla-seguro.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralSeguroRoutingModule } from './plural-seguro-routing.module';
import { PluralSeguroComponent } from './plural-seguro.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralSeguroComponent],
  imports: [
    CommonModule,
    PluralSeguroRoutingModule,
    TablaSeguroModule,
    SharedModule,
  ],
})
export class PluralSeguroModule {}
