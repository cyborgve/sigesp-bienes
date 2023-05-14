import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCategoriaRoutingModule } from './plural-categoria-routing.module';
import { PluralCategoriaComponent } from './plural-categoria.component';
import { TablaCategoriaModule } from '../tabla-categoria/tabla-categoria.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralCategoriaComponent],
  imports: [
    CommonModule,
    PluralCategoriaRoutingModule,
    TablaCategoriaModule,
    SharedModule,
  ],
})
export class PluralCategoriaModule {}
