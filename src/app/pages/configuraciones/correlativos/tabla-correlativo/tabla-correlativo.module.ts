import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaCorrelativoComponent } from './tabla-correlativo.component';
import { RouterModule } from '@angular/router';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TablaCorrelativoComponent],
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
  exports: [TablaCorrelativoComponent],
})
export class TablaCorrelativoModule {}
