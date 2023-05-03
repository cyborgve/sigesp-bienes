import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionBienesRoutingModule } from './configuracion-bienes-routing.module';
import { ConfiguracionBienesComponent } from './configuracion-bienes.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfiguracionBienesComponent],
  imports: [
    CommonModule,
    ConfiguracionBienesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ConfiguracionBienesModule {}
