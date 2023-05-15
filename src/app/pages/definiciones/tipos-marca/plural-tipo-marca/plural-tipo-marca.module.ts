import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoMarcaRoutingModule } from './plural-tipo-marca-routing.module';
import { PluralTipoMarcaComponent } from './plural-tipo-marca.component';

@NgModule({
  declarations: [PluralTipoMarcaComponent],
  imports: [CommonModule, PluralTipoMarcaRoutingModule],
})
export class PluralTipoMarcaModule {}
