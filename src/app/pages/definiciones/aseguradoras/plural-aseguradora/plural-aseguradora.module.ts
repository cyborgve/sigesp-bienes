import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralAseguradoraRoutingModule } from './plural-aseguradora-routing.module';
import { PluralAseguradoraComponent } from './plural-aseguradora.component';
import { TablaAseguradoraModule } from '../tabla-aseguradora/tabla-aseguradora.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralAseguradoraComponent],
  imports: [
    CommonModule,
    PluralAseguradoraRoutingModule,
    TablaAseguradoraModule,
    SharedModule,
  ],
})
export class PluralAseguradoraModule {}
