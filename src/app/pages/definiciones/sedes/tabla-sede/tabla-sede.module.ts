import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSedeComponent } from './tabla-sede.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TablaSedeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    RouterModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
  ],
  exports: [TablaSedeComponent],
})
export class TablaSedeModule {}
