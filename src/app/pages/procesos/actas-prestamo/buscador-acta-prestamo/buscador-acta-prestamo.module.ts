import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorActaPrestamoComponent } from './buscador-acta-prestamo.component';
import { TablaActaPrestamoModule } from '../tabla-acta-prestamo/tabla-acta-prestamo.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorActaPrestamoComponent],
  imports: [CommonModule, TablaActaPrestamoModule, MatDialogModule],
  exports: [BuscadorActaPrestamoComponent],
})
export class BuscadorActaPrestamoModule {}
