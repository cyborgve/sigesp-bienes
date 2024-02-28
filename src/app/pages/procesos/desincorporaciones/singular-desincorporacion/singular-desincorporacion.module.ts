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
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BuscadorCausaMovimientoModule } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.module';
import { BuscadorUnidadAdministrativaModule } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';

@NgModule({
  declarations: [SingularDesincorporacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularDesincorporacionRoutingModule,
    BuscadorDesincorporacionModule,
    BuscadorCausaMovimientoModule,
    BuscadorUnidadAdministrativaModule,
    BuscadorActivoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularDesincorporacionModule {}
