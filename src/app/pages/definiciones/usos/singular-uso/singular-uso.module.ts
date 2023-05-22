import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularUsoRoutingModule } from './singular-uso-routing.module';
import { SingularUsoComponent } from './singular-uso.component';
import { BuscadorUsoModule } from '../buscador-uso/buscador-uso.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingularUsoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularUsoRoutingModule,
    BuscadorUsoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularUsoModule {}
