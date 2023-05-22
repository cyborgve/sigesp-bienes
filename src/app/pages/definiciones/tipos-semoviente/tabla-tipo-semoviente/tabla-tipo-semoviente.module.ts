import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTipoSemovienteComponent } from './tabla-tipo-semoviente.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TablaTipoSemovienteComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
  ],
  exports: [TablaTipoSemovienteComponent],
})
export class TablaTipoSemovienteModule {}
