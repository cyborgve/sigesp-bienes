import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularDepreciacionRoutingModule } from './singular-depreciacion-routing.module';
import { SingularDepreciacionComponent } from './singular-depreciacion.component';
import { BuscadorDepreciacionModule } from '../buscador-depreciacion/buscador-depreciacion.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingularDepreciacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularDepreciacionRoutingModule,
    BuscadorDepreciacionModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularDepreciacionModule {}
