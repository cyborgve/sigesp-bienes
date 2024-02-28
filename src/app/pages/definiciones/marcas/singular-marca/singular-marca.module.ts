import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularMarcaRoutingModule } from './singular-marca-routing.module';
import { SingularMarcaComponent } from './singular-marca.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BuscadorMarcaModule } from '../buscador-marca/buscador-marca.module';
import { BuscadorTipoMarcaModule } from '@pages/definiciones/tipos-marca/buscador-tipo-marca/buscador-tipo-marca.module';

@NgModule({
  declarations: [SingularMarcaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularMarcaRoutingModule,
    BuscadorMarcaModule,
    BuscadorTipoMarcaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class SingularMarcaModule {}
