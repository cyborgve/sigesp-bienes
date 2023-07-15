import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularReasignacionRoutingModule } from './singular-reasignacion-routing.module';
import { SingularReasignacionComponent } from './singular-reasignacion.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorReasignacionModule } from '../buscador-reasignacion/buscador-reasignacion.module';

@NgModule({
  declarations: [SingularReasignacionComponent],
  imports: [
    CommonModule,
    SingularReasignacionRoutingModule,
    BuscadorReasignacionModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularReasignacionModule {}
