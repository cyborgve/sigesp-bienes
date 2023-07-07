import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularComponenteRoutingModule } from './singular-componente-routing.module';
import { SingularComponenteComponent } from './singular-componente.component';
import { SharedModule } from '@shared/shared.module';
import { BuscadorComponenteModule } from '../buscador-componente/buscador-componente.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorTipoComponenteModule } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.module';

@NgModule({
  declarations: [SingularComponenteComponent],
  imports: [
    CommonModule,
    SingularComponenteRoutingModule,
    SharedModule,
    BuscadorComponenteModule,
    BuscadorTipoComponenteModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularComponenteModule {}
