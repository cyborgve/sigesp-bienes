import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorColorComponent } from './buscador-color.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TablaColorModule } from '../tabla-color/tabla-color.module';

@NgModule({
  declarations: [BuscadorColorComponent],
  imports: [CommonModule, MatDialogModule, TablaColorModule],
  exports: [BuscadorColorComponent],
})
export class BuscadorColorModule {}
