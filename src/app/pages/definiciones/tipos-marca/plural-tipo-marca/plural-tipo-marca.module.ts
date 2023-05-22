import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoMarcaRoutingModule } from './plural-tipo-marca-routing.module';
import { PluralTipoMarcaComponent } from './plural-tipo-marca.component';
import { TablaTipoMarcaModule } from '../tabla-tipo-marca/tabla-tipo-marca.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralTipoMarcaComponent],
  imports: [
    CommonModule,
    PluralTipoMarcaRoutingModule,
    TablaTipoMarcaModule,
    SharedModule,
  ],
})
export class PluralTipoMarcaModule {}
