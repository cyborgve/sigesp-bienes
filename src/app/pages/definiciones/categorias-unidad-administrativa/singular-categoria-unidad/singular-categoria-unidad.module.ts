import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCategoriaUnidadRoutingModule } from './singular-categoria-unidad-routing.module';
import { SingularCategoriaUnidadComponent } from './singular-categoria-unidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularCategoriaUnidadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCategoriaUnidadRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularCategoriaUnidadModule {}
