import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralRazaRoutingModule } from './plural-raza-routing.module';
import { PluralRazaComponent } from './plural-raza.component';

@NgModule({
  declarations: [PluralRazaComponent],
  imports: [CommonModule, PluralRazaRoutingModule],
})
export class PluralRazaModule {}
