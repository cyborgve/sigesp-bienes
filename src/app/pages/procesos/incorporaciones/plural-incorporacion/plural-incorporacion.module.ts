import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralIncorporacionRoutingModule } from './plural-incorporacion-routing.module';
import { PluralIncorporacionComponent } from './plural-incorporacion.component';
import { TablaIncorporacionModule } from '../tabla-incorporacion/tabla-incorporacion.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralIncorporacionComponent],
  imports: [
    CommonModule,
    PluralIncorporacionRoutingModule,
    TablaIncorporacionModule,
    SharedModule,
  ],
})
export class PluralIncorporacionModule {}
