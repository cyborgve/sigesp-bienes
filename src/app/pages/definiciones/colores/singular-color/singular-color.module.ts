import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularColorRoutingModule } from './singular-color-routing.module';
import { SingularColorComponent } from './singular-color.component';

@NgModule({
  declarations: [SingularColorComponent],
  imports: [CommonModule, SingularColorRoutingModule],
})
export class SingularColorModule {}
