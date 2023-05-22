import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoMarcaRoutingModule } from './singular-tipo-marca-routing.module';
import { SingularTipoMarcaComponent } from './singular-tipo-marca.component';
import { BuscadorTipoMarcaModule } from '../buscador-tipo-marca/buscador-tipo-marca.module';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingularTipoMarcaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoMarcaRoutingModule,
    BuscadorTipoMarcaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoMarcaModule {}
