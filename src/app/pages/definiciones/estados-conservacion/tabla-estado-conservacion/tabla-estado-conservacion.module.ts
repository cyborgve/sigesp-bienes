import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaEstadoConservacionComponent } from './tabla-estado-conservacion.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [TablaEstadoConservacionComponent],
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
  exports: [TablaEstadoConservacionComponent],
})
export class TablaEstadoConservacionModule {}
