import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralUsoRoutingModule } from './plural-uso-routing.module';
import { PluralUsoComponent } from './plural-uso.component';
import { TablaUsoModule } from '../tabla-uso/tabla-uso.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralUsoComponent],
  imports: [CommonModule, PluralUsoRoutingModule, TablaUsoModule, SharedModule],
})
export class PluralUsoModule {}
