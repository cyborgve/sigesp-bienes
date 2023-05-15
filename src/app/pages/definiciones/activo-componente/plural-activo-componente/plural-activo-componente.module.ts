import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralActivoComponenteRoutingModule } from './plural-activo-componente-routing.module';
import { PluralActivoComponenteComponent } from './plural-activo-componente.component';
import { SharedModule } from '@shared/shared.module';
import { TablaActivoComponenteModule } from '../tabla-activo-componente/tabla-activo-componente.module';

@NgModule({
  declarations: [PluralActivoComponenteComponent],
  imports: [
    CommonModule,
    PluralActivoComponenteRoutingModule,
    SharedModule,
    TablaActivoComponenteModule,
  ],
})
export class PluralActivoComponenteModule {}
