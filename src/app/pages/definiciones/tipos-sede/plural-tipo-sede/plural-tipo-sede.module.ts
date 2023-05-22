import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoSedeRoutingModule } from './plural-tipo-sede-routing.module';
import { PluralTipoSedeComponent } from './plural-tipo-sede.component';
import { TablaTipoSedeModule } from '../tabla-tipo-sede/tabla-tipo-sede.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralTipoSedeComponent],
  imports: [
    CommonModule,
    PluralTipoSedeRoutingModule,
    TablaTipoSedeModule,
    SharedModule,
  ],
})
export class PluralTipoSedeModule {}
