import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncorporacionesMigradasRoutingModule } from './incorporaciones-migradas-routing.module';
import { IncorporacionesMigradasComponent } from './incorporaciones-migradas.component';
import { DetalleComponent } from './detalle/detalle.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [IncorporacionesMigradasComponent, DetalleComponent],
  imports: [
    CommonModule,
    IncorporacionesMigradasRoutingModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
})
export class IncorporacionesMigradasModule {}
