import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoUsoRoutingModule } from './plural-tipo-uso-routing.module';
import { PluralTipoUsoComponent } from './plural-tipo-uso.component';
import { TablaTipoUsoModule } from '../tabla-tipo-uso/tabla-tipo-uso.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralTipoUsoComponent],
  imports: [
    CommonModule,
    SharedModule,
    PluralTipoUsoRoutingModule,
    TablaTipoUsoModule,
  ],
})
export class PluralTipoUsoModule {}
