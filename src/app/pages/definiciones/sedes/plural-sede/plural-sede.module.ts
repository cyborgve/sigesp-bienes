import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralSedeRoutingModule } from './plural-sede-routing.module';
import { PluralSedeComponent } from './plural-sede.component';
import { TablaSedeModule } from '../tabla-sede/tabla-sede.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralSedeComponent],
  imports: [
    CommonModule,
    PluralSedeRoutingModule,
    SharedModule,
    TablaSedeModule,
    MatDialogModule,
  ],
})
export class PluralSedeModule {}
