import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCatalogoGeneralRoutingModule } from './singular-catalogo-general-routing.module';
import { SingularCatalogoGeneralComponent } from './singular-catalogo-general.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorCatalogoGeneralModule } from '../buscador-catalogo-general/buscador-catalogo-general.module';

@NgModule({
  declarations: [SingularCatalogoGeneralComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCatalogoGeneralRoutingModule,
    BuscadorCatalogoGeneralModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularCatalogoGeneralModule {}
