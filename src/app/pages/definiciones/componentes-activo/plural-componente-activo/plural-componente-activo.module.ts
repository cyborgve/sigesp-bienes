import { TablaComponenteActivoModule } from '@pages/definiciones/componentes-activo/tabla-componente-activo/tabla-componente-activo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralComponenteActivoRoutingModule } from './plural-componente-activo-routing.module';
import { PluralComponenteActivoComponent } from './plural-componente-activo.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralComponenteActivoComponent],
  imports: [
    CommonModule,
    SharedModule,
    PluralComponenteActivoRoutingModule,
    TablaComponenteActivoModule,
  ],
})
export class PluralComponenteActivoModule {}
