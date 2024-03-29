import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaRazaComponent } from './tabla-raza.component';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TablaRazaComponent],
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
  exports: [TablaRazaComponent],
})
export class TablaRazaModule {}
