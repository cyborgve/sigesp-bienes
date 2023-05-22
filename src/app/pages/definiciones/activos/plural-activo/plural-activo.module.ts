import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralActivoRoutingModule } from './plural-activo-routing.module';
import { PluralActivoComponent } from './plural-activo.component';
import { SharedModule } from '@shared/shared.module';
import { TablaActivoModule } from '../tabla-activo/tabla-activo.module';

@NgModule({
  declarations: [PluralActivoComponent],
  imports: [
    CommonModule,
    PluralActivoRoutingModule,
    SharedModule,
    TablaActivoModule,
  ],
})
export class PluralActivoModule {}
