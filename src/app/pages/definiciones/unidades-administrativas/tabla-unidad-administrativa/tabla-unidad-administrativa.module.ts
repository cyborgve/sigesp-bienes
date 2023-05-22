import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaUnidadAdministrativaComponent } from './tabla-unidad-administrativa.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TablaUnidadAdministrativaComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
  ],
  exports: [TablaUnidadAdministrativaComponent],
})
export class TablaUnidadAdministrativaModule {}
