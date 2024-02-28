import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorActivoComponent } from './buscador-activo.component';
import { TablaActivoModule } from '../tabla-activo/tabla-activo.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorActivoComponent],
  imports: [CommonModule, TablaActivoModule, MatDialogModule],
  exports: [BuscadorActivoComponent],
})
export class BuscadorActivoModule {}
