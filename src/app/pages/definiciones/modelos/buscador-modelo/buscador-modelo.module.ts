import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorModeloComponent } from './buscador-modelo.component';
import { TablaModeloModule } from '../tabla-modelo/tabla-modelo.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorModeloComponent],
  imports: [CommonModule, TablaModeloModule, MatDialogModule],
  exports: [BuscadorModeloComponent],
})
export class BuscadorModeloModule {}
