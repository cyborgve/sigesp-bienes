import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoAnimalRoutingModule } from './singular-tipo-animal-routing.module';
import { SingularTipoAnimalComponent } from './singular-tipo-animal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BuscadorTipoAnimalModule } from '../buscador-tipo-animal/buscador-tipo-animal.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

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
