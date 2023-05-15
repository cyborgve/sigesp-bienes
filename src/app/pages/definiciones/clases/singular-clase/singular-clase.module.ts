import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularClaseRoutingModule } from './singular-clase-routing.module';
import { SingularClaseComponent } from './singular-clase.component';

@NgModule({
  declarations: [SingularClaseComponent],
  imports: [CommonModule, SingularClaseRoutingModule],
})
export class SingularClaseModule {}
