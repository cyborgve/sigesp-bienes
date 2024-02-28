import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorEntregaUnidadComponent } from './buscador-entrega-unidad.component';
import { TablaEntregaUnidadModule } from '../tabla-entrega-unidad/tabla-entrega-unidad.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorEntregaUnidadComponent],
  imports: [CommonModule, TablaEntregaUnidadModule, MatDialogModule],
  exports: [BuscadorEntregaUnidadComponent],
})
export class BuscadorEntregaUnidadModule {}
