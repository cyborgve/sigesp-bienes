import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularSedeRoutingModule } from './singular-sede-routing.module';
import { SingularSedeComponent } from './singular-sede.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorSedeModule } from '../buscador-sede/buscador-sede.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorTipoSedeModule } from '@pages/definiciones/tipos-sede/buscador-tipo-sede/buscador-tipo-sede.module';

@NgModule({
  declarations: [SingularSedeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularSedeRoutingModule,
    BuscadorSedeModule,
    BuscadorTipoSedeModule,
    SharedModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularSedeModule {}
