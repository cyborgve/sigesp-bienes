import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralDepreciacionRoutingModule } from './plural-depreciacion-routing.module';
import { PluralDepreciacionComponent } from './plural-depreciacion.component';
import { TablaDepreciacionModule } from '../tabla-depreciacion/tabla-depreciacion.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralDepreciacionComponent],
  imports: [
    CommonModule,
    PluralDepreciacionRoutingModule,
    TablaDepreciacionModule,
    SharedModule,
  ],
})
export class PluralDepreciacionModule {}
