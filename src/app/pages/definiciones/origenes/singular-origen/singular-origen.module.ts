import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularOrigenRoutingModule } from './singular-origen-routing.module';
import { SingularOrigenComponent } from './singular-origen.component';

@NgModule({
  declarations: [SingularOrigenComponent],
  imports: [CommonModule, SingularOrigenRoutingModule],
})
export class SingularOrigenModule {}
