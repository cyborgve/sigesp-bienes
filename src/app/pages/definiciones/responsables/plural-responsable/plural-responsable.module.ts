import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralResponsableRoutingModule } from './plural-responsable-routing.module';
import { PluralResponsableComponent } from './plural-responsable.component';
import { SharedModule } from '@shared/shared.module';
import { TablaResponsableModule } from '../tabla-responsable/tabla-responsable.module';

@NgModule({
  declarations: [PluralResponsableComponent],
  imports: [
    CommonModule,
    PluralResponsableRoutingModule,
    SharedModule,
    TablaResponsableModule,
  ],
})
export class PluralResponsableModule {}
