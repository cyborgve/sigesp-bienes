import { BuscadorTipoUsoModule } from './../buscador-tipo-uso/buscador-tipo-uso.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoUsoRoutingModule } from './singular-tipo-uso-routing.module';
import { SingularTipoUsoComponent } from './singular-tipo-uso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SingularTipoUsoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SingularTipoUsoRoutingModule,
    BuscadorTipoUsoModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoUsoModule {}
