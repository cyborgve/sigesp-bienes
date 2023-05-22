import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoPolizaRoutingModule } from './plural-tipo-poliza-routing.module';
import { PluralTipoPolizaComponent } from './plural-tipo-poliza.component';
import { TablaTipoPolizaModule } from '../tabla-tipo-poliza/tabla-tipo-poliza.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralTipoPolizaComponent],
  imports: [
    CommonModule,
    PluralTipoPolizaRoutingModule,
    TablaTipoPolizaModule,
    SharedModule,
  ],
})
export class PluralTipoPolizaModule {}
