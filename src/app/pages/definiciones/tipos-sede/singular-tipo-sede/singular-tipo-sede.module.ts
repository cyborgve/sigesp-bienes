import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoSedeRoutingModule } from './singular-tipo-sede-routing.module';
import { SingularTipoSedeComponent } from './singular-tipo-sede.component';
import { BuscadorTipoSedeModule } from '../buscador-tipo-sede/buscador-tipo-sede.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SingularTipoSedeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoSedeRoutingModule,
    BuscadorTipoSedeModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoSedeModule {}
