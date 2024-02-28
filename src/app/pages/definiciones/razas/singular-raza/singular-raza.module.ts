import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRazaRoutingModule } from './singular-raza-routing.module';
import { SingularRazaComponent } from './singular-raza.component';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BuscadorRazaModule } from '../buscador-raza/buscador-raza.module';
import { BuscadorTipoAnimalModule } from '@pages/definiciones/tipos-animal/buscador-tipo-animal/buscador-tipo-animal.module';

@NgModule({
  declarations: [SingularRazaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularRazaRoutingModule,
    BuscadorRazaModule,
    BuscadorTipoAnimalModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularRazaModule {}
