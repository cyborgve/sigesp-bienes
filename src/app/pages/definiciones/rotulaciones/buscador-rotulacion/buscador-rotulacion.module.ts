import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorRotulacionComponent } from './buscador-rotulacion.component';
import { TablaRotulacionModule } from '../tabla-rotulacion/tabla-rotulacion.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorRotulacionComponent],
  imports: [CommonModule, TablaRotulacionModule, MatDialogModule],
  exports: [BuscadorRotulacionComponent],
})
export class BuscadorRotulacionModule {}
