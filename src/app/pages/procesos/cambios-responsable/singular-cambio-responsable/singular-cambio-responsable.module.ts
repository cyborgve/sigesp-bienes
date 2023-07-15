import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCambioResponsableRoutingModule } from './singular-cambio-responsable-routing.module';
import { SingularCambioResponsableComponent } from './singular-cambio-responsable.component';
import { BuscadorCambioResponsableModule } from '../buscador-cambio-responsable/buscador-cambio-responsable.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SingularCambioResponsableComponent],
  imports: [
    CommonModule,
    SingularCambioResponsableRoutingModule,
    BuscadorCambioResponsableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularCambioResponsableModule {}
