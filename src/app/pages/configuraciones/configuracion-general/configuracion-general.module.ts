import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionGeneralRoutingModule } from './configuracion-general-routing.module';
import { ConfiguracionGeneralComponent } from './configuracion-general.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfiguracionGeneralComponent],
  imports: [
    CommonModule,
    ConfiguracionGeneralRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
})
export class ConfiguracionGeneralModule {}
