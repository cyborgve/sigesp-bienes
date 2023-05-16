import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoPolizaRoutingModule } from './singular-tipo-poliza-routing.module';
import { SingularTipoPolizaComponent } from './singular-tipo-poliza.component';

@NgModule({
  declarations: [SingularTipoPolizaComponent],
  imports: [CommonModule, SingularTipoPolizaRoutingModule],
})
export class SingularTipoPolizaModule {}
