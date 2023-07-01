import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoAnimalRoutingModule } from './singular-tipo-animal-routing.module';
import { SingularTipoAnimalComponent } from './singular-tipo-animal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BuscadorTipoAnimalModule } from '../buscador-tipo-animal/buscador-tipo-animal.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SingularTipoAnimalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoAnimalRoutingModule,
    BuscadorTipoAnimalModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoAnimalModule {}
