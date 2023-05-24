import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularOrigenRoutingModule } from './singular-origen-routing.module';
import { SingularOrigenComponent } from './singular-origen.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BuscadorOrigenModule } from '../buscador-origen/buscador-origen.module';

@NgModule({
  declarations: [SingularOrigenComponent],
  imports: [
    CommonModule,
    SingularOrigenRoutingModule,
    SharedModule,
    BuscadorOrigenModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
})
export class SingularOrigenModule {}
