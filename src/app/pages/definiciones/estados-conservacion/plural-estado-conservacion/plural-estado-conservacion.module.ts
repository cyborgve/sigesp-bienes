import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralEstadoConservacionRoutingModule } from './plural-estado-conservacion-routing.module';
import { PluralEstadoConservacionComponent } from './plural-estado-conservacion.component';
import { TablaEstadoConservacionModule } from '../tabla-estado-conservacion/tabla-estado-conservacion.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralEstadoConservacionComponent],
  imports: [
    CommonModule,
    PluralEstadoConservacionRoutingModule,
    TablaEstadoConservacionModule,
    SharedModule,
  ],
})
export class PluralEstadoConservacionModule {}
