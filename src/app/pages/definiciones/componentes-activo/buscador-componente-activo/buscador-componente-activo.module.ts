import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponenteActivoComponent } from './buscador-componente-activo.component';
import { TablaComponenteActivoModule } from '../tabla-componente-activo/tabla-componente-activo.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorComponenteActivoComponent],
  imports: [CommonModule, TablaComponenteActivoModule, MatDialogModule],
  exports: [BuscadorComponenteActivoComponent],
})
export class BuscadorComponenteActivoModule {}
