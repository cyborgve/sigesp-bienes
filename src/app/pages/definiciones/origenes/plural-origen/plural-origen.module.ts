import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralOrigenRoutingModule } from './plural-origen-routing.module';
import { PluralOrigenComponent } from './plural-origen.component';
import { TablaOrigenModule } from '../tabla-origen/tabla-origen.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralOrigenComponent],
  imports: [
    CommonModule,
    PluralOrigenRoutingModule,
    TablaOrigenModule,
    SharedModule,
  ],
})
export class PluralOrigenModule {}
