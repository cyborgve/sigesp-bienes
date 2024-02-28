import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularPlantillaIntegracionRoutingModule } from './singular-plantilla-integracion-routing.module';
import { SingularPlantillaIntegracionComponent } from './singular-plantilla-integracion.component';
import { SharedModule } from '@shared/shared.module';
import { BuscadorPlantillaIntegracionModule } from '../buscador-plantilla-integracion/buscador-plantilla-integracion.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

@NgModule({
  declarations: [SingularPlantillaIntegracionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SingularPlantillaIntegracionRoutingModule,
    BuscadorPlantillaIntegracionModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class SingularPlantillaIntegracionModule {}
