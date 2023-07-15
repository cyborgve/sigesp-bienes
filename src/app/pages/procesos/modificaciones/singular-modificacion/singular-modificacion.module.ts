import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularModificacionRoutingModule } from './singular-modificacion-routing.module';
import { SingularModificacionComponent } from './singular-modificacion.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorModificacionModule } from '../buscador-modificacion/buscador-modificacion.module';

@NgModule({
  declarations: [SingularModificacionComponent],
  imports: [
    CommonModule,
    SingularModificacionRoutingModule,
    BuscadorModificacionModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularModificacionModule {}
