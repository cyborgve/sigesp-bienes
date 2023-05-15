import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularModeloRoutingModule } from './singular-modelo-routing.module';
import { SingularModeloComponent } from './singular-modelo.component';

@NgModule({
  declarations: [SingularModeloComponent],
  imports: [CommonModule, SingularModeloRoutingModule],
})
export class SingularModeloModule {}
