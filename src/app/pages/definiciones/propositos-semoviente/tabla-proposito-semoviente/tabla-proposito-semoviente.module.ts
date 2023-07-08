import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaPropositoSemovienteComponent } from './tabla-proposito-semoviente.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TablaPropositoSemovienteComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  exports: [TablaPropositoSemovienteComponent],
})
export class TablaPropositoSemovienteModule {}
