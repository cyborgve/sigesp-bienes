import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaTipoUsoComponent } from './tabla-tipo-uso.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [TablaTipoUsoComponent],
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
  exports: [TablaTipoUsoComponent],
})
export class TablaTipoUsoModule {}
