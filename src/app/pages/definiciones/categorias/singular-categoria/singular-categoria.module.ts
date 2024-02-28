import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCategoriaRoutingModule } from './singular-categoria-routing.module';
import { SingularCategoriaComponent } from './singular-categoria.component';
import { SharedModule } from '@shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BuscadorCategoriaModule } from '../buscador-categoria/buscador-categoria.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularCategoriaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCategoriaRoutingModule,
    BuscadorCategoriaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularCategoriaModule {}
