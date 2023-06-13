import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularPlantillaDepreciacionRoutingModule } from './singular-plantilla-depreciacion-routing.module';
import { SingularPlantillaDepreciacionComponent } from './singular-plantilla-depreciacion.component';
import { BuscadorPlantillaDepreciacionModule } from '../buscador-plantilla-depreciacion/buscador-plantilla-depreciacion.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SingularPlantillaDepreciacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularPlantillaDepreciacionRoutingModule,
    BuscadorPlantillaDepreciacionModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class SingularPlantillaDepreciacionModule {}
