import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCategoriaRoutingModule } from './singular-categoria-routing.module';
import { SingularCategoriaComponent } from './singular-categoria.component';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { BuscadorCategoriaModule } from '../buscador-categoria/buscador-categoria.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

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
