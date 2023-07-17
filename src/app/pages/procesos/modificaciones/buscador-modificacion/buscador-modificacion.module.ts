import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorModificacionComponent } from './buscador-modificacion.component';
import { TablaModificacionModule } from '../tabla-modificacion/tabla-modificacion.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorModificacionComponent],
  imports: [CommonModule, TablaModificacionModule, MatDialogModule],
  exports: [BuscadorModificacionComponent],
})
export class BuscadorModificacionModule {}
