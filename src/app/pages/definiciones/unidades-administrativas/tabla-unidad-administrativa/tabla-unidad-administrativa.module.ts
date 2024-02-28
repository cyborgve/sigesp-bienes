import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaUnidadAdministrativaComponent } from './tabla-unidad-administrativa.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TablaUnidadAdministrativaComponent],
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
  exports: [TablaUnidadAdministrativaComponent],
})
export class TablaUnidadAdministrativaModule {}
