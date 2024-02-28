import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCausaMovimientoRoutingModule } from './singular-causa-movimiento-routing.module';
import { SingularCausaMovimientoComponent } from './singular-causa-movimiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BuscadorCausaMovimientoModule } from '../buscador-causa-movimiento/buscador-causa-movimiento.module';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

@NgModule({
  declarations: [SingularCausaMovimientoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCausaMovimientoRoutingModule,
    BuscadorCausaMovimientoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
})
export class SingularCausaMovimientoModule {}
