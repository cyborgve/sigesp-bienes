import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoComponenteRoutingModule } from './plural-tipo-componente-routing.module';
import { PluralTipoComponenteComponent } from './plural-tipo-componente.component';

@NgModule({
  declarations: [PluralTipoComponenteComponent],
  imports: [CommonModule, PluralTipoComponenteRoutingModule],
})
export class PluralTipoComponenteModule {}
