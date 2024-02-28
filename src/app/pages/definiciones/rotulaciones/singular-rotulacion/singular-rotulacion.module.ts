import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRotulacionRoutingModule } from './singular-rotulacion-routing.module';
import { SingularRotulacionComponent } from './singular-rotulacion.component';
import { BuscadorRotulacionModule } from '../buscador-rotulacion/buscador-rotulacion.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SingularRotulacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularRotulacionRoutingModule,
    BuscadorRotulacionModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularRotulacionModule {}
