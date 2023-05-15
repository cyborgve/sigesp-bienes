import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoMarcaRoutingModule } from './singular-tipo-marca-routing.module';
import { SingularTipoMarcaComponent } from './singular-tipo-marca.component';

@NgModule({
  declarations: [SingularTipoMarcaComponent],
  imports: [CommonModule, SingularTipoMarcaRoutingModule],
})
export class SingularTipoMarcaModule {}
