import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularComponenteRoutingModule } from './singular-componente-routing.module';
import { SingularComponenteComponent } from './singular-componente.component';
import { SharedModule } from '@shared/shared.module';
import { BuscadorComponenteModule } from '../buscador-componente/buscador-componente.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorTipoComponenteModule } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.module';
import { BuscadorModeloModule } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.module';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';

@NgModule({
  declarations: [SingularComponenteComponent],
  imports: [
    CommonModule,
    SingularComponenteRoutingModule,
    SharedModule,
    BuscadorComponenteModule,
    BuscadorTipoComponenteModule,
    BuscadorModeloModule,
    BuscadorActivoModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularComponenteModule {}
