import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionGeneralRoutingModule } from './configuracion-general-routing.module';
import { ConfiguracionGeneralComponent } from './configuracion-general.component';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
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
