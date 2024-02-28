import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCambioResponsableRoutingModule } from './singular-cambio-responsable-routing.module';
import { SingularCambioResponsableComponent } from './singular-cambio-responsable.component';
import { BuscadorCambioResponsableModule } from '../buscador-cambio-responsable/buscador-cambio-responsable.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

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
