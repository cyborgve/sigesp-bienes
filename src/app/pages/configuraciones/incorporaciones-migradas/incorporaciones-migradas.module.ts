import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IncorporacionesMigradasRoutingModule } from './incorporaciones-migradas-routing.module';
import { IncorporacionesMigradasComponent } from './incorporaciones-migradas.component';
import { BuscadorCausaMovimientoModule } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.module';
import { SharedModule } from '@shared/shared.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [IncorporacionesMigradasComponent, DetalleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IncorporacionesMigradasRoutingModule,
    BuscadorCausaMovimientoModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class IncorporacionesMigradasModule {}
