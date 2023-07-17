import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRetornoRoutingModule } from './singular-retorno-routing.module';
import { SingularRetornoComponent } from './singular-retorno.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BuscadorRetornoModule } from '../buscador-retorno/buscador-retorno.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularRetornoComponent],
  imports: [
    CommonModule,
    SingularRetornoRoutingModule,
    BuscadorRetornoModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularRetornoModule {}
