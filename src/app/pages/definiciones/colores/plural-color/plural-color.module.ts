import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralColorRoutingModule } from './plural-color-routing.module';
import { PluralColorComponent } from './plural-color.component';
import { SharedModule } from '@shared/shared.module';
import { TablaColorModule } from '../tabla-color/tabla-color.module';

@NgModule({
  declarations: [PluralColorComponent],
  imports: [
    CommonModule,
    PluralColorRoutingModule,
    SharedModule,
    TablaColorModule,
  ],
})
export class PluralColorModule {}
