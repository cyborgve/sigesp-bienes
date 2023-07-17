import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralRetornoRoutingModule } from './plural-retorno-routing.module';
import { PluralRetornoComponent } from './plural-retorno.component';
import { TablaRetornoModule } from '../tabla-retorno/tabla-retorno.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralRetornoComponent],
  imports: [
    CommonModule,
    PluralRetornoRoutingModule,
    TablaRetornoModule,
    SharedModule,
  ],
})
export class PluralRetornoModule {}
