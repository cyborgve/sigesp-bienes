import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularPlantillaIntegracionRoutingModule } from './singular-plantilla-integracion-routing.module';
import { SingularPlantillaIntegracionComponent } from './singular-plantilla-integracion.component';
import { SharedModule } from '@shared/shared.module';
import { BuscadorPlantillaIntegracionModule } from '../buscador-plantilla-integracion/buscador-plantilla-integracion.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  ],
})
export class SingularPlantillaIntegracionModule {}
