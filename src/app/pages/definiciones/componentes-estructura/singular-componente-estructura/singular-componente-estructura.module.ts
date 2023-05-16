import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularComponenteEstructuraRoutingModule } from './singular-componente-estructura-routing.module';
import { SingularComponenteEstructuraComponent } from './singular-componente-estructura.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorComponenteEstructuraModule } from '../buscador-componente-estructura/buscador-componente-estructura.module';
import { BuscadorTipoEstructuraModule } from '@pages/definiciones/tipos-estructura/buscador-tipo-estructura/buscador-tipo-estructura.module';

@NgModule({
  declarations: [SingularComponenteEstructuraComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularComponenteEstructuraRoutingModule,
    BuscadorComponenteEstructuraModule,
    BuscadorTipoEstructuraModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularComponenteEstructuraModule {}
