import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorCorrelativoComponent } from './buscador-correlativo.component';
import { TablaCorrelativoModule } from '../tabla-correlativo/tabla-correlativo.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorCorrelativoComponent],
  imports: [CommonModule, TablaCorrelativoModule, MatDialogModule],
  exports: [BuscadorCorrelativoComponent],
})
export class BuscadorCorrelativoModule {}
