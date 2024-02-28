import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularColorRoutingModule } from './singular-color-routing.module';
import { SingularColorComponent } from './singular-color.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorColorModule } from '../buscador-color/buscador-color.module';
@NgModule({
  declarations: [SingularColorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularColorRoutingModule,
    BuscadorColorModule,
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularColorModule {}
