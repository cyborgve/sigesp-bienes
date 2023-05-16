import { TablaComponenteEstructuraModule } from './../tabla-componente-estructura/tabla-componente-estructura.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralComponenteEstructuraRoutingModule } from './plural-componente-estructura-routing.module';
import { PluralComponenteEstructuraComponent } from './plural-componente-estructura.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralComponenteEstructuraComponent],
  imports: [
    CommonModule,
    PluralComponenteEstructuraRoutingModule,
    TablaComponenteEstructuraModule,
    SharedModule,
  ],
})
export class PluralComponenteEstructuraModule {}
