import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTipoSedeComponent } from './tabla-tipo-sede.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TablaTipoSedeComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
  ],
  exports: [TablaTipoSedeComponent],
})
export class TablaTipoSedeModule {}
