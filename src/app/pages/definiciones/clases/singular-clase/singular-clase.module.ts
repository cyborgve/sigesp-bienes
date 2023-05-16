import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularClaseRoutingModule } from './singular-clase-routing.module';
import { SingularClaseComponent } from './singular-clase.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorClaseModule } from '../buscador-clase/buscador-clase.module';

@NgModule({
  declarations: [SingularClaseComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SingularClaseRoutingModule,
    BuscadorClaseModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularClaseModule {}
