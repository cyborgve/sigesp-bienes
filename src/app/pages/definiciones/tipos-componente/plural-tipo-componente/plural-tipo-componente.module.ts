import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoComponenteRoutingModule } from './plural-tipo-componente-routing.module';
import { PluralTipoComponenteComponent } from './plural-tipo-componente.component';
import { SharedModule } from '@shared/shared.module';
import { TablaTipoComponenteModule } from '../tabla-tipo-componente/tabla-tipo-componente.module';

@NgModule({
  declarations: [PluralTipoComponenteComponent],
  imports: [
    CommonModule,
    PluralTipoComponenteRoutingModule,
    SharedModule,
    TablaTipoComponenteModule,
  ],
})
export class PluralTipoComponenteModule {}
