import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularModificacionRoutingModule } from './singular-modificacion-routing.module';
import { SingularModificacionComponent } from './singular-modificacion.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
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
