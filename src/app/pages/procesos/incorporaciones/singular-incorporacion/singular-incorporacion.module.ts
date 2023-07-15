import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularIncorporacionRoutingModule } from './singular-incorporacion-routing.module';
import { SingularIncorporacionComponent } from './singular-incorporacion.component';
import { BuscadorIncorporacionModule } from '../buscador-incorporacion/buscador-incorporacion.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularIncorporacionComponent],
  imports: [
    CommonModule,
    SingularIncorporacionRoutingModule,
    BuscadorIncorporacionModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularIncorporacionModule {}
