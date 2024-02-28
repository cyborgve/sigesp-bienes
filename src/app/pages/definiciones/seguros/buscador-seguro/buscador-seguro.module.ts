import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorSeguroComponent } from './buscador-seguro.component';
import { TablaSeguroModule } from '../tabla-seguro/tabla-seguro.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorSeguroComponent],
  imports: [CommonModule, TablaSeguroModule, MatDialogModule],
  exports: [BuscadorSeguroComponent],
})
export class BuscadorSeguroModule {}
