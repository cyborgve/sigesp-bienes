import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularSeguroRoutingModule } from './singular-seguro-routing.module';
import { SingularSeguroComponent } from './singular-seguro.component';

@NgModule({
  declarations: [SingularSeguroComponent],
  imports: [CommonModule, SingularSeguroRoutingModule],
})
export class SingularSeguroModule {}
