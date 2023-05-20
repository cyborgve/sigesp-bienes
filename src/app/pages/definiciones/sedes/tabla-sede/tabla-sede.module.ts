import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSedeComponent } from './tabla-sede.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
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
