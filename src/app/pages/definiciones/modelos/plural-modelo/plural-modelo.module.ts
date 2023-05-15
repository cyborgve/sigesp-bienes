import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralModeloRoutingModule } from './plural-modelo-routing.module';
import { PluralModeloComponent } from './plural-modelo.component';

@NgModule({
  declarations: [PluralModeloComponent],
  imports: [CommonModule, PluralModeloRoutingModule],
})
export class PluralModeloModule {}
