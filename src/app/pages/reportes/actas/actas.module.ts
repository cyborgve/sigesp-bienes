import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActasRoutingModule } from './actas-routing.module';
import { ActasComponent } from './actas.component';

@NgModule({
  declarations: [ActasComponent],
  imports: [CommonModule, ActasRoutingModule],
})
export class ActasModule {}
