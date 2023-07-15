import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularDepreciacionActivoRoutingModule } from './singular-depreciacion-activo-routing.module';
import { SingularDepreciacionActivoComponent } from './singular-depreciacion-activo.component';
import { BuscadorDepreciacionActivoModule } from '../buscador-depreciacion-activo/buscador-depreciacion-activo.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularDepreciacionActivoComponent],
  imports: [
    CommonModule,
    SingularDepreciacionActivoRoutingModule,
    BuscadorDepreciacionActivoModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularDepreciacionActivoModule {}
