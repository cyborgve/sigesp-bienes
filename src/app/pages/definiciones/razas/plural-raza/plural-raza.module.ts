import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralRazaRoutingModule } from './plural-raza-routing.module';
import { PluralRazaComponent } from './plural-raza.component';
import { SharedModule } from '@shared/shared.module';
import { TablaRazaModule } from '../tabla-raza/tabla-raza.module';

@NgModule({
  declarations: [PluralRazaComponent],
  imports: [
    CommonModule,
    PluralRazaRoutingModule,
    SharedModule,
    TablaRazaModule,
  ],
})
export class PluralRazaModule {}
