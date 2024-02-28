import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularModeloRoutingModule } from './singular-modelo-routing.module';
import { SingularModeloComponent } from './singular-modelo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorModeloModule } from '../buscador-modelo/buscador-modelo.module';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorMarcaModule } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.module';

@NgModule({
  declarations: [SingularModeloComponent],
  imports: [
    CommonModule,
    SingularModeloRoutingModule,
    BuscadorModeloModule,
    BuscadorMarcaModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ],
})
export class SingularModeloModule {}
