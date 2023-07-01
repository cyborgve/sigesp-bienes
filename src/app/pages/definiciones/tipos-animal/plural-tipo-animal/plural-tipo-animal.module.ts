import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralTipoAnimalRoutingModule } from './plural-tipo-animal-routing.module';
import { PluralTipoAnimalComponent } from './plural-tipo-animal.component';
import { TablaTipoAnimalModule } from '../tabla-tipo-animal/tabla-tipo-animal.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralTipoAnimalComponent],
  imports: [
    CommonModule,
    SharedModule,
    PluralTipoAnimalRoutingModule,
    TablaTipoAnimalModule,
  ],
})
export class PluralTipoAnimalModule {}
