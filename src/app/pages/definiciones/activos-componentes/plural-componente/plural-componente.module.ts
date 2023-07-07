import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralComponenteRoutingModule } from './plural-componente-routing.module';
import { PluralComponenteComponent } from './plural-componente.component';
import { SharedModule } from '@shared/shared.module';
import { TablaComponenteModule } from '../tabla-componente/tabla-componente.module';

@NgModule({
  declarations: [PluralComponenteComponent],
  imports: [
    CommonModule,
    PluralComponenteRoutingModule,
    SharedModule,
    TablaComponenteModule,
  ],
})
export class PluralComponenteModule {}
