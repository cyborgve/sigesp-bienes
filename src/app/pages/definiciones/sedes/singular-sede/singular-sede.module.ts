import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularSedeRoutingModule } from './singular-sede-routing.module';
import { SingularSedeComponent } from './singular-sede.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorSedeModule } from '../buscador-sede/buscador-sede.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
