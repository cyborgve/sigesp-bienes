import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoComponenteRoutingModule } from './singular-tipo-componente-routing.module';
import { SingularTipoComponenteComponent } from './singular-tipo-componente.component';

@NgModule({
  declarations: [SingularTipoComponenteComponent],
  imports: [CommonModule, SingularTipoComponenteRoutingModule],
})
export class SingularTipoComponenteModule {}
