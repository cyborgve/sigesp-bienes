import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralModificacionRoutingModule } from './plural-modificacion-routing.module';
import { PluralModificacionComponent } from './plural-modificacion.component';
import { TablaModificacionModule } from '../tabla-modificacion/tabla-modificacion.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralModificacionComponent],
  imports: [
    CommonModule,
    PluralModificacionRoutingModule,
    TablaModificacionModule,
    SharedModule,
  ],
})
export class PluralModificacionModule {}
