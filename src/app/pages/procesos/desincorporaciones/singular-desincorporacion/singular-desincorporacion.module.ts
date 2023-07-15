import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularDesincorporacionRoutingModule } from './singular-desincorporacion-routing.module';
import { SingularDesincorporacionComponent } from './singular-desincorporacion.component';
import { BuscadorDesincorporacionModule } from '../buscador-desincorporacion/buscador-desincorporacion.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularDesincorporacionComponent],
  imports: [
    CommonModule,
    SingularDesincorporacionRoutingModule,
    BuscadorDesincorporacionModule,
    BuscadorDesincorporacionModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularDesincorporacionModule {}
