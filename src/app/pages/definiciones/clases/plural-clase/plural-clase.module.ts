import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralClaseRoutingModule } from './plural-clase-routing.module';
import { PluralClaseComponent } from './plural-clase.component';
import { TablaClaseModule } from '../tabla-clase/tabla-clase.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralClaseComponent],
  imports: [
    CommonModule,
    PluralClaseRoutingModule,
    TablaClaseModule,
    SharedModule,
  ],
})
export class PluralClaseModule {}
