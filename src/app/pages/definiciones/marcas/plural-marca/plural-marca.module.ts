import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralMarcaRoutingModule } from './plural-marca-routing.module';
import { PluralMarcaComponent } from './plural-marca.component';

@NgModule({
  declarations: [PluralMarcaComponent],
  imports: [CommonModule, PluralMarcaRoutingModule],
})
export class PluralMarcaModule {}
