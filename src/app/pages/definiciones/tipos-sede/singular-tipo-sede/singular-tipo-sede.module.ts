import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoSedeRoutingModule } from './singular-tipo-sede-routing.module';
import { SingularTipoSedeComponent } from './singular-tipo-sede.component';

@NgModule({
  declarations: [SingularTipoSedeComponent],
  imports: [CommonModule, SingularTipoSedeRoutingModule],
})
export class SingularTipoSedeModule {}
