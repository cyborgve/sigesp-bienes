import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularSedeRoutingModule } from './singular-sede-routing.module';
import { SingularSedeComponent } from './singular-sede.component';

@NgModule({
  declarations: [SingularSedeComponent],
  imports: [CommonModule, SingularSedeRoutingModule],
})
export class SingularSedeModule {}
