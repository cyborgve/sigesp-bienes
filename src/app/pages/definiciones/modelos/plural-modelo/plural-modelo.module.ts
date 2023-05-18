import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralModeloRoutingModule } from './plural-modelo-routing.module';
import { PluralModeloComponent } from './plural-modelo.component';
import { SharedModule } from '@shared/shared.module';
import { TablaModeloModule } from '../tabla-modelo/tabla-modelo.module';

@NgModule({
  declarations: [PluralModeloComponent],
  imports: [
    CommonModule,
    PluralModeloRoutingModule,
    SharedModule,
    TablaModeloModule,
  ],
})
export class PluralModeloModule {}
