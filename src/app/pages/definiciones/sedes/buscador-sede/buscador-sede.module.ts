import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorSedeComponent } from './buscador-sede.component';
import { TablaSedeModule } from '../tabla-sede/tabla-sede.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorSedeComponent],
  imports: [CommonModule, TablaSedeModule, MatDialogModule],
  exports: [BuscadorSedeComponent],
})
export class BuscadorSedeModule {}
