import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularEntregaUnidadRoutingModule } from './singular-entrega-unidad-routing.module';
import { SingularEntregaUnidadComponent } from './singular-entrega-unidad.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BuscadorEntregaUnidadModule } from '../buscador-entrega-unidad/buscador-entrega-unidad.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorSedeModule } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.module';
import { BuscadorUnidadAdministrativaModule } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.module';

@NgModule({
  declarations: [SingularEntregaUnidadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularEntregaUnidadRoutingModule,
    BuscadorEntregaUnidadModule,
    BuscadorUnidadAdministrativaModule,
    BuscadorSedeModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularEntregaUnidadModule {}
