import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaCategoriaUnidadAdministrativaComponent } from './tabla-categoria-unidad-administrativa.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TablaCategoriaUnidadAdministrativaComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    SharedModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  exports: [TablaCategoriaUnidadAdministrativaComponent],
})
export class TablaCategoriaUnidadAdministrativaModule {}
