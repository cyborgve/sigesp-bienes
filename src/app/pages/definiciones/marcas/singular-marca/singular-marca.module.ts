import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularMarcaRoutingModule } from './singular-marca-routing.module';
import { SingularMarcaComponent } from './singular-marca.component';

@NgModule({
  declarations: [SingularMarcaComponent],
  imports: [CommonModule, SingularMarcaRoutingModule],
})
export class SingularMarcaModule {}
