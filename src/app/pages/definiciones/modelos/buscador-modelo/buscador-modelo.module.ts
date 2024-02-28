import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorModeloComponent } from './buscador-modelo.component';
import { TablaModeloModule } from '../tabla-modelo/tabla-modelo.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorModeloComponent],
  imports: [CommonModule, TablaModeloModule, MatDialogModule],
  exports: [BuscadorModeloComponent],
})
export class BuscadorModeloModule {}
