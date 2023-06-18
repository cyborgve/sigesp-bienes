import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCorrelativoRoutingModule } from './plural-correlativo-routing.module';
import { PluralCorrelativoComponent } from './plural-correlativo.component';
import { TablaCorrelativoModule } from '../tabla-correlativo/tabla-correlativo.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralCorrelativoComponent],
  imports: [
    CommonModule,
    SharedModule,
    PluralCorrelativoRoutingModule,
    TablaCorrelativoModule,
  ],
})
export class PluralCorrelativoModule {}
