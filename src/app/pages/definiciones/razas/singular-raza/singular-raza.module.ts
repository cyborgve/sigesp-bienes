import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRazaRoutingModule } from './singular-raza-routing.module';
import { SingularRazaComponent } from './singular-raza.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorRazaModule } from '../buscador-raza/buscador-raza.module';

@NgModule({
  declarations: [SingularRazaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularRazaRoutingModule,
    BuscadorRazaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularRazaModule {}
