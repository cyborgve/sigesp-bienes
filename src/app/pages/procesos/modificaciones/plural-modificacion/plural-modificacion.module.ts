import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralModificacionRoutingModule } from './plural-modificacion-routing.module';
import { PluralModificacionComponent } from './plural-modificacion.component';

@NgModule({
  declarations: [PluralModificacionComponent],
  imports: [CommonModule, PluralModificacionRoutingModule],
})
export class PluralModificacionModule {}
