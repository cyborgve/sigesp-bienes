import { PluralActivoComponenteComponent } from './plural-activo-componente.component';
import { NgModule } from '@angular/core';

import { PluralActivoComponenteRoutingModule } from './plural-activo-componente-routing.module';
import { TablaActivoComponenteModule } from '../tabla-activo-componente/tabla-activo-componente.module';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [PluralActivoComponenteComponent],
  imports: [
    PluralActivoComponenteRoutingModule,
    TablaActivoComponenteModule,
    SharedModule,
  ],
})
export class PluralActivoComponenteModule {}
