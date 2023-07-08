import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCategoriaUnidadRoutingModule } from './plural-categoria-unidad-routing.module';
import { PluralCategoriaUnidadComponent } from './plural-categoria-unidad.component';
import { SharedModule } from '@shared/shared.module';
import { TablaCategoriaUnidadModule } from '../tabla-categoria-unidad/tabla-categoria-unidad.module';

@NgModule({
  declarations: [PluralCategoriaUnidadComponent],
  imports: [
    CommonModule,
    PluralCategoriaUnidadRoutingModule,
    SharedModule,
    TablaCategoriaUnidadModule,
  ],
})
export class PluralCategoriaUnidadModule {}
