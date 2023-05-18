import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralMarcaRoutingModule } from './plural-marca-routing.module';
import { PluralMarcaComponent } from './plural-marca.component';
import { TablaMarcaModule } from '../tabla-marca/tabla-marca.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralMarcaComponent],
  imports: [
    CommonModule,
    PluralMarcaRoutingModule,
    SharedModule,
    TablaMarcaModule,
  ],
})
export class PluralMarcaModule {}
