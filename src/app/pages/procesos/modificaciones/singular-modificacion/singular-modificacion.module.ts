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
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BuscadorComponenteModule } from '@pages/definiciones/activos-componentes/buscador-componente/buscador-componente.module';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';
import { BuscadorCausaMovimientoModule } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.module';

@NgModule({
  declarations: [SingularModificacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularModificacionRoutingModule,
    BuscadorModificacionModule,
    BuscadorComponenteModule,
    BuscadorActivoModule,
    BuscadorCausaMovimientoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularModificacionModule {}
