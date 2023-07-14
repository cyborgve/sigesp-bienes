import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCorrelativoRoutingModule } from './singular-correlativo-routing.module';
import { SingularCorrelativoComponent } from './singular-correlativo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { BuscadorCorrelativoModule } from '../buscador-correlativo/buscador-correlativo.module';
import { AdvertenciaCorrelativoComponent } from './advertencia-correlativo.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SingularCorrelativoComponent, AdvertenciaCorrelativoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SingularCorrelativoRoutingModule,
    BuscadorCorrelativoModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class SingularCorrelativoModule {}
