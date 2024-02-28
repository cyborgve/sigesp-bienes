import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularIncorporacionRoutingModule } from './singular-incorporacion-routing.module';
import { SingularIncorporacionComponent } from './singular-incorporacion.component';
import { BuscadorIncorporacionModule } from '../buscador-incorporacion/buscador-incorporacion.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorCausaMovimientoModule } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.module';
import { BuscadorUnidadAdministrativaModule } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { BuscadorSedeModule } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.module';
import { SharedModule } from '@shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';

@NgModule({
  declarations: [SingularIncorporacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularIncorporacionRoutingModule,
    BuscadorIncorporacionModule,
    BuscadorCausaMovimientoModule,
    BuscadorUnidadAdministrativaModule,
    BuscadorActivoModule,
    BuscadorSedeModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
})
export class SingularIncorporacionModule {}
