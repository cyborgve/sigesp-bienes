import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTipoPolizaComponent } from './tabla-tipo-poliza.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TablaTipoPolizaComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
  ],
  exports: [TablaTipoPolizaComponent],
})
export class TablaTipoPolizaModule {}
