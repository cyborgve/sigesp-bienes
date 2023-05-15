import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRazaRoutingModule } from './singular-raza-routing.module';
import { SingularRazaComponent } from './singular-raza.component';

@NgModule({
  declarations: [SingularRazaComponent],
  imports: [CommonModule, SingularRazaRoutingModule],
})
export class SingularRazaModule {}
