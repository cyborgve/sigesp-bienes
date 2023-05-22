import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorSeguroComponent } from './buscador-seguro.component';
import { TablaSeguroModule } from '../tabla-seguro/tabla-seguro.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorSeguroComponent],
  imports: [CommonModule, TablaSeguroModule, MatDialogModule],
  exports: [BuscadorSeguroComponent],
})
export class BuscadorSeguroModule {}
