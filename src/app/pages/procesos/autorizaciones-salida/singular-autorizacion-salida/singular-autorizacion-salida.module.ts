import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularAutorizacionSalidaRoutingModule } from './singular-autorizacion-salida-routing.module';
import { SingularAutorizacionSalidaComponent } from './singular-autorizacion-salida.component';
import { BuscadorAutorizacionSalidaModule } from '../buscador-autorizacion-salida/buscador-autorizacion-salida.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';
import { BuscadorUnidadAdministrativaModule } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

@NgModule({
  declarations: [SingularAutorizacionSalidaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularAutorizacionSalidaRoutingModule,
    BuscadorAutorizacionSalidaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    BuscadorActivoModule,
    BuscadorUnidadAdministrativaModule,
  ],
})
export class SingularAutorizacionSalidaModule {}
