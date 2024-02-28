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
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SingularCambioResponsableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCambioResponsableRoutingModule,
    BuscadorCambioResponsableModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BuscadorActivoModule,
  ],
})
export class SingularCambioResponsableModule {}
