import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCatalogoGeneralRoutingModule } from './plural-catalogo-general-routing.module';
import { PluralCatalogoGeneralComponent } from './plural-catalogo-general.component';
import { TablaCatalogoGeneralModule } from '../tabla-catalogo-general/tabla-catalogo-general.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralCatalogoGeneralComponent],
  imports: [
    CommonModule,
    PluralCatalogoGeneralRoutingModule,
    SharedModule,
    TablaCatalogoGeneralModule,
  ],
})
export class PluralCatalogoGeneralModule {}
