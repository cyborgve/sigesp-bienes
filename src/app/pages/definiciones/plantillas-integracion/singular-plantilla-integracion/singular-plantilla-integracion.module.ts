import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularPlantillaIntegracionRoutingModule } from './singular-plantilla-integracion-routing.module';
import { SingularPlantillaIntegracionComponent } from './singular-plantilla-integracion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularPlantillaIntegracionComponent],
  imports: [
    CommonModule,
    SingularPlantillaIntegracionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class SingularPlantillaIntegracionModule {}
