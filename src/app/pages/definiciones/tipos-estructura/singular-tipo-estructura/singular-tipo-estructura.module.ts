import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoEstructuraRoutingModule } from './singular-tipo-estructura-routing.module';
import { SingularTipoEstructuraComponent } from './singular-tipo-estructura.component';
import { BuscadorTipoEstructuraModule } from '../buscador-tipo-estructura/buscador-tipo-estructura.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularTipoEstructuraComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoEstructuraRoutingModule,
    BuscadorTipoEstructuraModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoEstructuraModule {}
