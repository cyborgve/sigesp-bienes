import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorActivoComponent } from './buscador-activo.component';
import { TablaActivoModule } from '../tabla-activo/tabla-activo.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorActivoComponent],
  imports: [CommonModule, TablaActivoModule, MatDialogModule],
  exports: [BuscadorActivoComponent],
})
export class BuscadorActivoModule {}
